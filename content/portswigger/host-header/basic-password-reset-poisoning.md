# [Basic password reset poisoning](https://portswigger.net/web-security/host-header/exploiting/password-reset-poisoning/lab-host-header-basic-password-reset-poisoning)

> This is the **password reset poisoning lab**. The goal: reset **Carlos's** password by poisoning the reset link with your own Host header.

- The link in the email is built from the **Host header**.
- You control that header.
- So you point the link at **your server** and catch the victim's token.

## Part 1: See how reset works (on your own account)

**Step 1: Ask for a reset**

- Go to the login page.
- Find **"Forgot your password?"**
- Request a reset for **your own** account.

**Step 2: Check the email**

- Open the exploit server.
- Open the email client.
- You'll get a reset email.
- The link has a token: `temp-forgot-password-token`.

**Step 3: Use the link**

- Click the link.
- Set a new password if you want, anything you like.

## Part 2: Find the weak spot

**Step 4: Find the right request**

- Open **Burp** -> HTTP history.
- Find this request: `POST /forgot-password`
- It holds the **username** being reset.
- Send it to **Burp Repeater**.

**Step 5: Test the Host header**

- In Repeater, change the **Host header** to any value.
- Send it. The reset still works.
- Check your email again.
- The link now uses **your fake Host**, not the real domain.

> This is the flaw: the server builds the reset link from a header **you control**.

## Part 3: Steal Carlos's token

**Step 6: Point the link at your server**

- In Repeater, set the Host header to: `xxx.exploit-server.net`
- Change `username` to `carlos`.
- Send the request.

**Step 7: Grab the token**

- Open your exploit server -> **access log**.
- Look for: `GET /forgot-password`
- It contains **Carlos's reset token**.

> Why this works: the reset email goes to Carlos, but the link points to **your** server. When the link is loaded, your log captures his token.

## Part 4: Take over the account

**Step 8: Build the real link**

- Go to your email client.
- Copy the **real** reset URL from your **first** email.
- Open it in the browser.
- Swap **your** token for **Carlos's** token from the log.

**Step 9: Finish**

- Set a new password for Carlos.
- Log in as **`carlos`**.
