# [URL normalization](https://portswigger.net/web-security/web-cache-poisoning/exploiting-implementation-flaws/lab-web-cache-poisoning-normalization)

- open the lab in burp browser
- send the `/` request to the repeater
- check if it is a cache oracle (it is)
- lets find a cachebuster
- the query changes caches the response
- start a Param Miner (extension) on the request to check what might be unkeyed
- `Extensions` -> `Param Miner` -> `Guess everything`
- it will give back nothing
- lets try the `/` to url encode

```
GET %2f HTTP/2
...
```

- it will respond with a 404 but with a html content with in it

```
HTTP/2 404 Not Found
...
<p>Not Found: %2f</p>
```

- try to add a script to it

```
GET %2f<script>alert(1)</script> HTTP/2
...
```

- in the response the script will appear:

```
HTTP/2 404 Not Found
...
<p>Not Found: %2f<script>alert(1)</script></p>
```

- so can break out from the content

## exploit

- because of the 10 sec have to do it fast
- send the request to in burp twice
- switch to burp browser and add the script to the end of the url

```
https://xxx.web-security-academy.net/<script>alert(1)</script>
```

- you can try if you want
- but most importantly there is a deliver to victim button and add the url there
- send it
