# Stored XSS

Also known as second-order or persistent XSS -> when an application receives data from an untrusted source and includes that data within its later HTTP responses

> Like submitting a comments on a blog posts, which are displayed to other users

```
POST /post/comment HTTP/1.1
Host: vulnerable-website.com
Content-Length: 100

postId=3&comment=This+post+was+extremely+helpful.&name=Carlos+Montoya&email=carlos%40normal-user.net
```

> results to the other visitors ->

`<p>This post was extremely helpful.</p>`

> but what if the `comment=...` gets a different content like

`<script>/* Bad stuff here... */</script>`

->

```
POST /post/comment HTTP/1.1
Host: vulnerable-website.com
Content-Length: 100

postId=3&comment=%3Cscript%3E%2F*%2BBad%2Bstuff%2Bhere...%2B*%2F%3C%2Fscript%3E&name=Carlos+Montoya&email=carlos%40normal-user.net
```

->

`<p><script>/* Bad stuff here... */</script></p>`

like `alert(JSON.stringify(localStorage))`

## Entry points into the application for stored xss:

- Parameters or other data within the URL query string and message body.
- The URL file path.
- HTTP request headers that might not be exploitable in relation to reflected XSS.
- Any out-of-band routes via which an attacker can deliver data into the application.
