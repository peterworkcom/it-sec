# stored dom-based

When the server receives data from one request, stores it, and then includes the data in a later response, a script within the later response contains a sink which then processes the data in an unsafe way.

## example

in a textinput would like to add the following:

`<img src=1 onerror=alert() />`

but it does not trigger, because there is a function that checks the content:

```
function escapeHTML(html) {
return html.replace("<", "&lt;").replace(">", "&gt;");
}
```

so in a case of exploitation it escapes the `<` and `>` characters, but in a close look it only changes the first occurrence

lets try to add those first occurrences to the exploit

`<><img src=1 onerror=alert() />`

with this should work
