# Reflected cross-site scripting

Reflected cross-site scripting (or XSS) arises when an application receives data in an HTTP request and includes that data within the immediate response in an unsafe way.

```
https://insecure-website.com/search?term=gift

<p>You searched for: gift</p>
```

```
https://insecure-website.com/search?term=<script>/*+Bad+stuff+here...+*/</script>

<p>You searched for: <script>/* Bad stuff here... */</script></p>
```

like

`<script> alert("fun") </script>`

or

`<script> print("fun") </script>`

- some browsers do not let the alert() to be used but print() still ok
