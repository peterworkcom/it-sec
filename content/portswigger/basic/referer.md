# Referer

> The Referer header is an HTTP request header that tells a server which URL the user came from. When you click a link on Page A that takes you to Page B, the browser includes a Referer header in the request to Page B, with Page A's URL as its value.

`Referer: <url>`

You're on `https://en.wikipedia.org/wiki/HTTP` and you click a link pointing to `https://example.com/article`. Your browser sends:

```
GET /article HTTP/1.1
Host: example.com
Referer: https://en.wikipedia.org/wiki/HTTP
User-Agent: Mozilla/5.0 ...
Accept: text/html
```

The server at example.com now knows the visitor arrived from a Wikipedia article about HTTP.

#### When Browsers Send It

The header is included in many request types, not just clicks:

- Following a hyperlink
- Submitting a form
- Loading sub-resources (images, scripts, stylesheets, iframes)
- XHR / fetch requests
- Redirects

#### When Browsers Do Not Send It

There are several cases where browsers deliberately omit it or strip it down:

- Navigating from HTTPS to HTTP (downgrade) — historically stripped to protect privacy
- Typing a URL directly into the address bar
- Using a bookmark
- Requests originating from data: or file: URLs
- When the page sets a strict Referrer-Policy (more on this below)

## Controlling It with `Referrer-Policy`

> Modern web pages can control how much referer info the browser leaks using the `Referrer-Policy` header (or `<meta>` tag, or referrerpolicy attribute on individual elements).

<table>
  <thead>
    <tr>
      <th>Policy</th>
      <th>Destination</th>
      <th>Header Sent</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>no-referrer</code></td>
      <td>any destination</td>
      <td><em>(header omitted)</em></td>
      <td>Never sends Referer, regardless of context</td>
    </tr>
    <tr>
      <td><code>no-referrer-when-downgrade</code></td>
      <td><code>https://news.example.com/other</code></td>
      <td><code>https://news.example.com/articles/2026/private?id=42</code></td>
      <td>Same-origin HTTPS, full URL sent</td>
    </tr>
    <tr>
      <td><code>no-referrer-when-downgrade</code></td>
      <td><code>https://other-site.com/</code></td>
      <td><code>https://news.example.com/articles/2026/private?id=42</code></td>
      <td>Cross-origin but still HTTPS, full URL sent</td>
    </tr>
    <tr>
      <td><code>no-referrer-when-downgrade</code></td>
      <td><code>http://other-site.com/</code></td>
      <td><em>(header omitted)</em></td>
      <td>HTTPS → HTTP downgrade, header stripped</td>
    </tr>
    <tr>
      <td><code>origin</code></td>
      <td><code>https://news.example.com/other</code></td>
      <td><code>https://news.example.com/</code></td>
      <td>Always origin only, even same-origin</td>
    </tr>
    <tr>
      <td><code>origin</code></td>
      <td><code>https://other-site.com/</code></td>
      <td><code>https://news.example.com/</code></td>
      <td>Path and query stripped</td>
    </tr>
    <tr>
      <td><code>origin</code></td>
      <td><code>http://other-site.com/</code></td>
      <td><code>https://news.example.com/</code></td>
      <td>Sent even on downgrade</td>
    </tr>
    <tr>
      <td><code>origin-when-cross-origin</code></td>
      <td><code>https://news.example.com/other</code></td>
      <td><code>https://news.example.com/articles/2026/private?id=42</code></td>
      <td>Same-origin gets full URL</td>
    </tr>
    <tr>
      <td><code>origin-when-cross-origin</code></td>
      <td><code>https://other-site.com/</code></td>
      <td><code>https://news.example.com/</code></td>
      <td>Cross-origin gets origin only</td>
    </tr>
    <tr>
      <td><code>origin-when-cross-origin</code></td>
      <td><code>http://other-site.com/</code></td>
      <td><code>https://news.example.com/</code></td>
      <td>Sent on downgrade — risky, leaks origin to plaintext</td>
    </tr>
    <tr>
      <td><code>same-origin</code></td>
      <td><code>https://news.example.com/other</code></td>
      <td><code>https://news.example.com/articles/2026/private?id=42</code></td>
      <td>Same-origin, full URL</td>
    </tr>
    <tr>
      <td><code>same-origin</code></td>
      <td><code>https://other-site.com/</code></td>
      <td><em>(header omitted)</em></td>
      <td>Cross-origin sends nothing</td>
    </tr>
    <tr>
      <td><code>same-origin</code></td>
      <td><code>http://other-site.com/</code></td>
      <td><em>(header omitted)</em></td>
      <td>Cross-origin sends nothing</td>
    </tr>
    <tr>
      <td><code>strict-origin</code></td>
      <td><code>https://news.example.com/other</code></td>
      <td><code>https://news.example.com/</code></td>
      <td>Always origin only, even same-origin</td>
    </tr>
    <tr>
      <td><code>strict-origin</code></td>
      <td><code>https://other-site.com/</code></td>
      <td><code>https://news.example.com/</code></td>
      <td>Origin only on cross-origin HTTPS</td>
    </tr>
    <tr>
      <td><code>strict-origin</code></td>
      <td><code>http://other-site.com/</code></td>
      <td><em>(header omitted)</em></td>
      <td>Stripped on downgrade</td>
    </tr>
    <tr>
      <td><code>strict-origin-when-cross-origin</code></td>
      <td><code>https://news.example.com/other</code></td>
      <td><code>https://news.example.com/articles/2026/private?id=42</code></td>
      <td>Same-origin gets full URL</td>
    </tr>
    <tr>
      <td><code>strict-origin-when-cross-origin</code></td>
      <td><code>https://other-site.com/</code></td>
      <td><code>https://news.example.com/</code></td>
      <td>Cross-origin gets origin only</td>
    </tr>
    <tr>
      <td><code>strict-origin-when-cross-origin</code></td>
      <td><code>http://other-site.com/</code></td>
      <td><em>(header omitted)</em></td>
      <td>Stripped on downgrade — this is the modern browser default</td>
    </tr>
    <tr>
      <td><code>unsafe-url</code></td>
      <td><code>https://news.example.com/other</code></td>
      <td><code>https://news.example.com/articles/2026/private?id=42</code></td>
      <td>Full URL always</td>
    </tr>
    <tr>
      <td><code>unsafe-url</code></td>
      <td><code>https://other-site.com/</code></td>
      <td><code>https://news.example.com/articles/2026/private?id=42</code></td>
      <td>Full URL leaked cross-origin</td>
    </tr>
    <tr>
      <td><code>unsafe-url</code></td>
      <td><code>http://other-site.com/</code></td>
      <td><code>https://news.example.com/articles/2026/private?id=42</code></td>
      <td>Full URL leaked over plaintext — name says it all</td>
    </tr>
  </tbody>
</table>
