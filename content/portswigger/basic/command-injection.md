# command injection

> OS command injection (shell injection) allows an attacker to execute OS commands on the server that is running an application, an attacker can leverage an OS command injection vulnerability to compromise other parts of the hosting infrastructure

- in case of a product request like
- `https://insecure-website.com/stockStatus?productID=381&storeID=29`
- the query to the system might look like
- `stockreport.pl 381 29`
- where an injected command could change the system query
- `https://insecure-website.com/stockStatus?productID=; echo aiwefwlguh ;&storeID=29`
- what will result to a
- `stockreport.pl ; echo aiwefwlguh ; 29`
- command

<table>
  <tbody>
    <tr>
      <th>Purpose of command</th>
      <th>Linux</th>
      <th>Windows</th>
    </tr>
    <tr>
      <td>Name of current user</td>
      <td><code> whoami </code></td>
      <td><code> whoami </code></td>
    </tr>
    <tr>
      <td>Operating system</td>
      <td><code> uname -a </code></td>
      <td><code> ver </code></td>
    </tr>
    <tr>
      <td>Network configuration</td>
      <td><code> ifconfig </code></td>
      <td><code> ipconfig /all </code></td>
    </tr>
    <tr>
      <td>Network connections</td>
      <td><code> netstat -an </code></td>
      <td><code> netstat -an </code></td>
    </tr>
    <tr>
      <td>Running processes</td>
      <td><code> ps -ef </code></td>
      <td><code> tasklist </code></td>
    </tr>
  </tbody>
</table>
