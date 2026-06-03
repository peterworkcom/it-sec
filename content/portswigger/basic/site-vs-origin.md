# Site vs Origin

## Origin

> An origin is the tuple of scheme + host + port. Two URLs share an origin only if all three match exactly.

```
https://example.com:443/page1
https://example.com:443/page2
```

These are the same origin, same scheme (https), same host (example.com), same port (443).

## Site

> A site is defined as scheme + registrable domain (also called eTLD+1).

For `https://api.example.com`, the registrable domain is example.com, so the site is `https://example.com`.

## Side-by-Side Comparison

<table>
  <thead>
    <tr>
      <th>URL A</th>
      <th>URL B</th>
      <th>Same Origin?</th>
      <th>Same Site?</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>https://example.com/</code></td>
      <td><code>https://example.com/</code></td>
      <td>✅</td>
      <td>✅</td>
      <td>Identical URLs</td>
    </tr>
    <tr>
      <td><code>https://example.com/page1</code></td>
      <td><code>https://example.com/page2</code></td>
      <td>✅</td>
      <td>✅</td>
      <td>Path is irrelevant for both checks</td>
    </tr>
    <tr>
      <td><code>https://example.com/?a=1</code></td>
      <td><code>https://example.com/?a=2</code></td>
      <td>✅</td>
      <td>✅</td>
      <td>Query strings are irrelevant</td>
    </tr>
    <tr>
      <td><code>https://example.com/#top</code></td>
      <td><code>https://example.com/#bottom</code></td>
      <td>✅</td>
      <td>✅</td>
      <td>Fragments are irrelevant</td>
    </tr>
    <tr>
      <td><code>https://example.com:443/</code></td>
      <td><code>https://example.com/</code></td>
      <td>✅</td>
      <td>✅</td>
      <td>443 is the default port for HTTPS, so it matches an omitted port</td>
    </tr>
    <tr>
      <td><code>http://example.com:80/</code></td>
      <td><code>http://example.com/</code></td>
      <td>✅</td>
      <td>✅</td>
      <td>80 is the default port for HTTP</td>
    </tr>
    <tr>
      <td><code>https://example.com/</code></td>
      <td><code>https://user:pass@example.com/</code></td>
      <td>✅</td>
      <td>✅</td>
      <td>Userinfo is not part of the origin</td>
    </tr>
    <tr>
      <td><code>https://EXAMPLE.com/</code></td>
      <td><code>https://example.com/</code></td>
      <td>✅</td>
      <td>✅</td>
      <td>Host comparison is case-insensitive</td>
    </tr>
    <tr>
      <td><code>https://example.com/</code></td>
      <td><code>https://www.example.com/</code></td>
      <td>❌</td>
      <td>✅</td>
      <td>Different host, but same registrable domain</td>
    </tr>
    <tr>
      <td><code>https://api.example.com/</code></td>
      <td><code>https://cdn.example.com/</code></td>
      <td>❌</td>
      <td>✅</td>
      <td>Sibling subdomains, same site</td>
    </tr>
    <tr>
      <td><code>https://a.b.example.com/</code></td>
      <td><code>https://example.com/</code></td>
      <td>❌</td>
      <td>✅</td>
      <td>Deep subdomain still rolls up to the same registrable domain</td>
    </tr>
    <tr>
      <td><code>https://example.com:443/</code></td>
      <td><code>https://example.com:8443/</code></td>
      <td>❌</td>
      <td>✅</td>
      <td>Different ports break origin but not site</td>
    </tr>
    <tr>
      <td><code>https://example.com/</code></td>
      <td><code>http://example.com/</code></td>
      <td>❌</td>
      <td>❌</td>
      <td>Different scheme; schemeful same-site treats these as different sites</td>
    </tr>
    <tr>
      <td><code>https://example.com/</code></td>
      <td><code>https://example.org/</code></td>
      <td>❌</td>
      <td>❌</td>
      <td>Different registrable domain entirely</td>
    </tr>
    <tr>
      <td><code>https://www.bbc.co.uk/</code></td>
      <td><code>https://news.bbc.co.uk/</code></td>
      <td>❌</td>
      <td>✅</td>
      <td><code>co.uk</code> is a public suffix, so the site is <code>bbc.co.uk</code></td>
    </tr>
    <tr>
      <td><code>https://alice.github.io/</code></td>
      <td><code>https://bob.github.io/</code></td>
      <td>❌</td>
      <td>❌</td>
      <td><code>github.io</code> is a public suffix, so each user is their own site</td>
    </tr>
    <tr>
      <td><code>https://192.168.1.10/</code></td>
      <td><code>https://192.168.1.10/admin</code></td>
      <td>✅</td>
      <td>✅</td>
      <td>IP literals work like hosts; same IP, same origin</td>
    </tr>
    <tr>
      <td><code>https://192.168.1.10/</code></td>
      <td><code>https://192.168.1.11/</code></td>
      <td>❌</td>
      <td>❌</td>
      <td>Different IPs are always different origins and different sites</td>
    </tr>
    <tr>
      <td><code>https://localhost:3000/</code></td>
      <td><code>https://localhost:3001/</code></td>
      <td>❌</td>
      <td>✅</td>
      <td>Common dev gotcha: different ports are cross-origin even on localhost</td>
    </tr>
  </tbody>
</table>
