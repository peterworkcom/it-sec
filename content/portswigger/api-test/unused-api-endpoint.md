# [Finding and exploiting an unused API endpoint](https://portswigger.net/web-security/api-testing/lab-exploiting-unused-api-endpoint)

> exploiting hidden API endpoint

- use burp browser and log in with the credentials `wiener:peter`
- the endpoint will react differently with logged in/out users
- works only with logged in users

- click on the "Lightweight l33t Leather Jacket"
- check the HTTP history
- send the `/api/products/1/price` request to the repeater

> can play with the method to `OPTIONS` and form there the error messages will guide you to the solution

## solution

- change the request to the following

```
PATCH /api/products/1/price HTTP/2
...
Content-Type: application/json

{"price":0}
```
