# [Cache key injection](https://portswigger.net/web-security/web-cache-poisoning/exploiting-implementation-flaws/lab-web-cache-poisoning-cache-key-injection)

> The whole exploit is: make a **malicious response** get stored under the **same key** the victim's innocent request will produce. Then the cache hands _them_ your poison.

---

## The 4 flaws to chained

**1. Unkeyed smuggle space**

- Start a Param Miner (extension) on the request to check what might be unkeyed
- `Extensions` -> `Param Miner` -> `Guess everything`
- It will give back the `utm_content`

> A broken regex strips `utm_content` from the **key**, but the server still **reads** it.

- Using `?` instead of `&` keeps it _inside_ the `lang` value: `lang=en?utm_content=...`
- Cache key: `lang=en`
- Server reads: the whole thing

-> A hiding spot: unkeyed to the cache, live to the server.

**2. No URL-encoding (param pollution)**

- `/login` pastes your `lang` into the script URL **raw**.
- A smuggled `%26` becomes a live `&`.

-> Lets you inject **`cors=1`**.

**3. Response header injection (CRLF)**

- With `cors=1`, the server reflects your **`Origin`** into a header, unsanitized.
- Smuggled CRLF (`%0d%0a`) ends the headers early and writes your own body:

-> **`alert(1)`**, which runs because the browser loads it as a script.

**4. Cache key injection (the glue)**

- The cache builds its key with a `$$` delimiter you can inject.

-> You shape the key so your malicious response caches under the **victim's** key.

---

## Solution

**Step 1, Recon with the debug header**

- Add `Pragma: x-get-cache-key` to see the key the server computes.
- This is your ground truth for every test.

**Step 2, Find the smuggle space**

- Confirm `/login?lang=en?utm_content=...` lets `utm_content` fall out of the key but stay for the server.

**Step 3, Poison the script (Request A)**

```
GET /js/localize.js?lang=en?utm_content=z&cors=1&x=1 HTTP/2
...
Origin: x%0d%0aContent-Length:%208%0d%0a%0d%0aalert(1)$$$$
```

-> Response body becomes `alert(1)`, stored in cache.

**Step 4, Poison the redirect (Request B)**

```
GET /login?lang=en?utm_content=x%26cors=1%26x=1$$origin=x%250d%250aContent-Length:%208%250d%250a%250d%250aalert(1)$$%23 HTTP/2
...
```

-> `/login?lang=en` now redirects to a login page importing your poisoned script.

- Send "A" first, then "B"

---

## Why the fiddly bits exist

| Piece                     | Job                                                                    |
| ------------------------- | ---------------------------------------------------------------------- |
| `utm_content=z`           | Something for the regex to strip (value ignored, so it still collides) |
| `x=1`                     | Dummy terminator + cache-buster for clean re-tests                     |
| `%26`                     | Encoded `&` -> survives transport, decodes live to inject `cors=1`     |
| `$$...$$`                 | Cache's key delimiter -> shapes the key to match the victim's          |
| `%23`                     | Encoded `#` -> cuts off trailing junk the server appends               |
| `Pragma: x-get-cache-key` | Shows the real computed key, trust it over any guess                   |
