# SameSite

`SameSite` is a cookie attribute not a header, set by the server when it issues the cookie for the client

```
   Set-Cookie:    sessionId=abc123;    SameSite=Strict; Secure; HttpOnly
└─ header name ─┘  └ name=value ┘   └─ attributes that modify the cookie ─┘
```

## Difference between a site and an origin?

<table>
  <tbody>
    <tr>
      <td>
        <strong>Request from</strong>
      </td>
      <td>
        <strong>Request to</strong>
      </td>
      <td>
        <strong>Same-site?</strong>
      </td>
      <td>
        <strong>Same-origin?</strong>
      </td>
    </tr>
    <tr>
      <td>
        <code>https://example.com</code>
      </td>
      <td>
        <code>https://example.com</code>
      </td>
      <td>Yes</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>
        <code>https://app.example.com</code>
      </td>
      <td>
        <code>https://intranet.example.com</code>
      </td>
      <td>Yes</td>
      <td>No: mismatched domain name</td>
    </tr>
    <tr>
      <td>
        <code>https://example.com</code>
      </td>
      <td>
        <code>https://example.com:8080</code>
      </td>
      <td>Yes</td>
      <td>No: mismatched port</td>
    </tr>
    <tr>
      <td>
        <code>https://example.com</code>
      </td>
      <td>
        <code>https://example.co.uk</code>
      </td>
      <td>No: mismatched eTLD</td>
      <td>No: mismatched domain name</td>
    </tr>
    <tr>
      <td>
        <code>https://example.com</code>
      </td>
      <td>
        <code>http://example.com</code>
      </td>
      <td>No: mismatched scheme</td>
      <td>No: mismatched scheme</td>
    </tr>
  </tbody>
</table>

## SameSite restriction levels

- Strict
- Lax
- None

> Strict

Browsers will not send it in any cross-site requests, only send request from the same site what can have negative effect tho

> Lax

Browsers will send the cookie in cross-site requests, but only if both of the following conditions are met:

- The request uses the GET method.

- The request resulted from a top-level navigation by the user, such as clicking on a link (full url change)

- HTML forms can only natively submit `GET` or `POST`. They can't issue `PUT`, `PATCH`, or `DELETE`. So frameworks like Ruby on Rails, Laravel, and Symfony introduced a hidden `_method` field convention.

```
<form method="POST" action="/users/42">
  <input type="hidden" name="_method" value="DELETE">
  <button>Delete user</button>
</form>
```

> None

Effectively disables SameSite restrictions altogether
