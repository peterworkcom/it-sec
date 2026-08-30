# [Exploiting an API endpoint using documentation](https://portswigger.net/web-security/api-testing/lab-exploiting-api-endpoint-using-documentation)

> getting API documentation

- in burp browser log in with the credentials `wiener:peter`
- change the email
- check the HTTP history
- there is a `PATCH /api/user/wiener` request
- sent it to the repeater
- test for `PATCH /api/user` and `PATCH /api`
- the `PATCH /api` will redirect, follow it
- open the `/api` in a browser
- can interact with it, delete **carlos**
