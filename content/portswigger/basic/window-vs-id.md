# `window` vs multiple same `id`

- on chrome browser the `window` will add the elements with `id` to its object
- multiple elements with the same `id` will create a `HTMLCollection`

```html
<html>
  <body>
    <a id="duck" href="one" name="quack">first</a>
    <button id="duck" href="two">second</button>
    <a id="duck" href="three" name="quack">third</a>
    <a id="duck" href="cid:four" name="wuf">forth</a>
  </body>
</html>
```

- it will collect every unique "identification" even for the same element
- for the same "identification" the first element will be picked

```js
window.duck;

HTMLCollection(4) [a#duck, button#duck, a#duck, a#duck, duck: a#duck, quack: a#duck, wuf: a#duck]
```

- that is actually

```
0: a#duck
1: button#duck
2: a#duck
3: a#duck
duck: a#duck
quack: a#duck
wuf: a#duck
```

> `<a id="duck" href="one" name="quack">first</a>`

- `0: a#duck`
- `duck: a#duck`
- `quack: a#duck`

> `<button id="duck" href="two">second</button>`

- `1: button#duck`

> `<a id="duck" href="three" name="quack">third</a>`

- `2: a#duck`

> `<a id="duck" href="cid:four" name="wuf">forth</a>`

- `3: a#duck`
- `wuf: a#duck`

## can call by the assigned variables

```js
window.duck.duck;
```

-> `<a id="duck" href="one" name="quack">first</a>`

```js
window.duck.quack;
```

-> `<a id="duck" href="one" name="quack">first</a>`

```js
window.duck.wuf;
```

-> `<a id="duck" href="cid:four" name="wuf">forth</a>`

## `.toString()` them

```js
window.duck.quack.toString();
```

-> `"http://www.example.com/one"`

- it will add the `href` value to the site url

```js
window.duck.wuf.toString();
```

-> `"cid:four"`

- it will **not** add the `href` value to the site url
