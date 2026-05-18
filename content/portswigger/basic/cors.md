# `CORS` - cross-origin resource sharing

> The same-origin policy is very restrictive, many websites interact with subdomains or third-party sites in a way that requires full cross-origin access. A controlled lift of the same-origin policy is possible using cross-origin resource sharing.

- `CORS` protocol uses a suite of HTTP headers that define trusted web origins.
- Many modern websites use `CORS` to allow access from subdomains and trusted third parties.
- Basically all `CORS` attacks involve JavaScript, because `CORS` is a JS-specific protection in the first place.

> what `CORS` questions:

- should this origin's JavaScript be allowed to read what the user is entitled to?!

> `CORS` job:

- protects the browser's user from leaking data to malicious origins, not the server's data from unauthorized requests.
- for that the `CORS` headers are responsible

| Header                                    | What it controls                                                                                   |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `Access-Control-Allow-Origin` (ACAO)      | **Which origin** is allowed to read the response                                                   |
| `Access-Control-Allow-Credentials` (ACAC) | Whether the response can be read when the request included **credentials** (cookies, auth headers) |
| `Access-Control-Allow-Methods`            | Which HTTP methods are allowed (for preflighted requests)                                          |
| `Access-Control-Allow-Headers`            | Which custom request headers are allowed (for preflighted requests)                                |
| `Access-Control-Expose-Headers`           | Which response headers JS is allowed to read (beyond the default safe ones)                        |
| `Access-Control-Max-Age`                  | How long the browser can cache the preflight result                                                |

- ACAO says who can read the response. ACAC says whether credentials are part of the deal. The other headers say what kinds of requests are permitted in the first place.

> good sequence:

- good site sends request to good server
- good server responds with `CORS` headers
- ACAO matches good site
- browser lets good site `JS` read the response

> evil sequence (server configured correctly):

- evil site sends request to good server
- good server responds with `CORS` headers
- ACAO does not match evil site
- browser does not let evil site `JS` read the response

> evil sequence (server misconfigured - origin reflection):

- evil site sends request to good server (with victim's cookies via `withCredentials`)
- good server reflects `Origin: evil.com` back as ACAO
- ACAO matches evil site
- browser lets evil site `JS` read the response -> data stolen
