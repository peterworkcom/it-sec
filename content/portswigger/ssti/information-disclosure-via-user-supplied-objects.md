# [Server-side template injection with information disclosure via user-supplied objects](https://portswigger.net/web-security/server-side-template-injection/exploiting/lab-server-side-template-injection-with-information-disclosure-via-user-supplied-objects)

- open the lab in a browser
- login in with `content-manager:C0nt3ntM4n4g3r`
- open a product
- edit the product template
- add a fuzz string: `${{<%[%'"}}%\`
- the error points to django framework
- the django documentation tells that the built-in template tag `debug` can be called to display debugging information
- add the `{% debug %}`
- the returned has an object with a `settings` prop what has a `SECRET_KEY` prop
- enter the expression: `{{settings.SECRET_KEY}}`
