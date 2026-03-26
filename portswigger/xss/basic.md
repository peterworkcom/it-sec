# basic

> try to break out from an input field by adding the line below and submitting it

`<script> alert("fun") </script>`

or

`<script> print("fun") </script>`

- some browsers do not let the alert() to be used but print() still ok

## types

- Reflected XSS, where the malicious script comes from the current HTTP request.

- Stored XSS, where the malicious script comes from the website's database.

- DOM-based XSS, where the vulnerability exists in client-side code rather than server-side code.

#### Reflected XSS

- application receives data in an HTTP request and includes that data within the immediate response in an unsafe way

```
https://insecure-website.com/status?message=All+is+well.

<p>Status: All is well.</p>
```

```
https://insecure-website.com/status?message=<script>/*+Bad+stuff+here...+*/</script>

<p>Status: <script>/* Bad stuff here... */</script></p>
```

#### Stored cross-site scripting

also known as persistent or second-order XSS arises when an application receives data from an untrusted source and includes that data within its later HTTP responses in an unsafe way

- an unsafe chat app message from an attacker that I might read

```
<p>Hello, how you doing?</p>

<p>Hello, how you doing?<script>/* Bad stuff here... */</script></p>
```

#### DOM-based cross-site scripting

also known as DOM XSS arises when an application contains some client-side JavaScript that processes data from an untrusted source in an unsafe way, usually by writing the data back to the DOM

an input that writes its value to a html element

```
var search = document.getElementById('search').value;
var results = document.getElementById('results');
results.innerHTML = 'You searched for: ' + search;
```

attacker can construct a malicious value

```
You searched for: <img src=1 onerror='/* Bad stuff here... */'>
```

## examples

> an input content might goes to a parameter like:

`<img src="/resources/images/tracker.gif?searchTerms=input_content">`

- can break out from it with the right input:

`"><svg onload="alert('fun')" />`

will look like ->

`<img src="/resources/images/tracker.gif?searchTerms="><svg onload="alert('fun')" />">`

prettify ->

```
<img src="/resources/images/tracker.gif?searchTerms=">
<svg onload="alert('fun')" />
">
```
