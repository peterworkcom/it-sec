# [](https://portswigger.net/web-security/web-cache-poisoning/exploiting-implementation-flaws/lab-web-cache-poisoning-internal)

> Make the home page run **`alert(document.cookie)`** for the victim.

- Two caches: **external** (front) + **internal** (back). They key requests differently.
- An input that's **keyed externally but unkeyed internally** = poisonable.

## The two inputs

| Input              | External | Internal |
| ------------------ | -------- | -------- |
| Query string       | keyed    | unkeyed  |
| `X-Forwarded-Host` | keyed    | unkeyed  |

`X-Forwarded-Host` rewrites the **host in the page's import URLs** -> point them at your server.

## Why geolocate.js

Two URLs get rewritten: analytics.js, geolocate.js.

- **analytics.js** -> external cache, header keyed -> victim dodges it
- **geolocate.js** -> internal cache, header unkeyed -> victim gets it

## How you know there's an internal cache

No cache header, so prove by behaviour:
Send a fresh `?cb=random` each time ->

- analytics **change**
- **geolocate.js stays frozen** -> a second cache that ignores the query string

## Steps

1. `GET /` to Repeater.
2. Add `?cb=random` -> bypass external cache.
3. Add `X-Forwarded-Host: your-exploit-server`. Resend until `geolocate.js` flips.
4. Exploit server -> store file `/js/geolocate.js` with body `alert(document.cookie)`.
5. Remove cache-buster, re-add header. Resend until all 3 URLs point at you.
6. Keep replaying until the victim visits -> **solved**.

## Watch out

- `Host` = **lab**, `X-Forwarded-Host` = **exploit server**.
- Ignore the lab banner, watch the **3 import URLs**.
- No hit/miss header here, prove caching by **behaviour**.
