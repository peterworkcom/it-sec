# SameSite

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
