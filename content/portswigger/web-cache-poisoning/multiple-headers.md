# [Web cache poisoning with multiple headers](https://portswigger.net/web-security/web-cache-poisoning/exploiting-design-flaws/lab-web-cache-poisoning-with-multiple-headers)

- This lab handles two unkeyed headers in an unsafe way, poison the cache with a response that executes `alert(document.cookie)` in the visitor's browser.

## recon

- open the lab in burp browser
- send the `/` request to repeater
- send it again
- the `X-Cache: miss` changes to `X-Cache: hit`
- it caches the response (cache oracle)
- check the response there is a `script` that the page runs

```
<script type="text/javascript" src="/resources/js/tracking.js">
```

- poisoning this `script` would be the goal
- check the `Target` -> `Site map`
- there is a `/resources/js/tracking.js` request
- caching it with an exploit would be the goal
- send it to the repeater

---

**use a cachebuster to make the exploit testing only for you**
`/?qwe=asd`

---

- start a Param Miner (extension) on the request to check what headers might be exploitable
- `Extensions` -> `Param Miner` -> `Guess Headers`
- it will give back the `x-forwarded-scheme`
- `x-forwarded-scheme` is unkeyed, so if that changes, the cachekey will not change, so any exploit with `x-forwarded-scheme` will not stay in the cache
- if you check the request with `X-Forwarded-Scheme: https` it will give back the expected response
- if you check the request with `X-Forwarded-Scheme: http` it will redirect to a fixed `https` url
- lets do another `Param Miner` with the `X-Forwarded-Scheme: http` included
- it will give back the header: `x-forwarded-host`
- try to add it to the request like this: `x-forwarded-host: example.com`
- the redirect wil point to the `https://example.com/resources/js/tracking.js?qwe=asd`
- this is the fixed `X-Forwarded-Scheme`, `https` instead of `http`
- plus the `x-forwarded-host` url with the cachebuster
- try the homepage with the cachebuster added to it after a repeater request: `https://...academy.net/?qwe=asd`
- it will redirect to the `https://example.com/?qwe=asd`
- this means the response is cached

## exploit

- go to the exploit server
- copy the url and add it to the `x-forwarded-host: exploit-...-server.net`
- in the exploit server add the `/resources/js/tracking.js` to the file
- add the `alert(document.cookie)` tot he body
- store the exploit
- in the repeater delete the `?qwe=asd`
- send the request
- try to apply the request every 20 sec, the lab should be solved in 1 minute
