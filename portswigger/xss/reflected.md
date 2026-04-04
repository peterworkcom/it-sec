# Reflected cross-site scripting

Reflected cross-site scripting (or XSS) arises when an application receives data in an HTTP request and includes that data within the immediate response in an unsafe way.

> Key traits:

- Not stored anywhere
- Requires victim to click a crafted link
- Happens on the server response

->

- The payload is sent to the server
- The server includes it in the HTML response
- Execution happens because the server reflects it

---

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
