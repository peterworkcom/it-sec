# [Web cache poisoning with an unkeyed cookie](https://portswigger.net/web-security/web-cache-poisoning/exploiting-design-flaws/lab-web-cache-poisoning-with-an-unkeyed-cookie)

- This lab handles unkeyed cookie in an unsafe way, poison the cache with a response that executes `alert(1)` in the visitor's browser.

## recon

- open the lab in burp browser
- send the `/` request to repeater
- send it again
- the `X-Cache: miss` changes to `X-Cache: hit`
- it caches the response
- there is a cache setter as well -> `Set-Cookie: fehost=prod-cache-01`
- it might be good for `XSS` payload

---

**use a cachebuster to make the exploit testing only for you**
`/?qwe=asd`

---

## exploit setup

- in the repeater set the `Cookie: session=...; fehost=someString"-alert(1)-"someString`
- send the request
- `fehost` value will be executed as `javascript`
- go back to the page and add the url the `/?qwe=asd`
- reload the page
- it should give an `alert` what means it works
- now, to solve the lab in the repeater send the request without the `?qwe=asd`
- you can check on your home page if the exploit work (without the `?qwe=asd`)
