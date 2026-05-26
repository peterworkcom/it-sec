# DOM-based vulnerabilities

## Web message

> two `window` communicating with each other, the `window.postMessage()` method safely enables cross-origin communication between Window objects

- between a page and a pop-up that it spawned
- between a page and an iframe embedded within it
- scripts on different pages are allowed to access each other if and only if the pages they originate from share the same origin (`same-origin policy`)
- `window.postMessage()` provides a controlled mechanism to securely circumvent this restriction (or not :D)
- accessing script must have obtained the window object beforehand, this can occur through methods such as `window.open()` for popups or `iframe.contentWindow` for iframes

> `window.postMessage()` self test on `window`

```
window.addEventListener("message", (event) => console.log(event.data));
window.postMessage("'capp?!");
```

- type it in any browser console
