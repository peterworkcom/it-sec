# [Host header authentication bypass](https://portswigger.net/web-security/host-header/exploiting/lab-host-header-authentication-bypass)

> This is the **auth bypass lab**. The goal: reach an admin panel meant for **local users only**, by faking the Host header.

- The admin panel checks **"are you local?"** by reading the **Host header**.
- You control that header.
- So you set `Host: localhost` and the server lets you in.

## Part 1: Check the Host header is flexible

**Step 1: Test the home page**

- Find the `GET /` request that got a **200** response.
- Send it to **Burp Repeater**.
- Change the **Host header** to any value.
- Send it. The home page still loads.

> This tells you the server **doesn't check** the Host value. Good sign for this attack.

## Part 2: Find the hidden admin panel

**Step 2: Read robots.txt**

- Browse to `/robots.txt`.
- It mentions an admin panel at **`/admin`**.

**Step 3: Try the panel**

- Browse to `/admin`.
- You're **blocked**.
- But read the error message: "Admin interface only available to local users"

## Part 3: Pretend to be local

**Step 4: Set up the request**

- Send the `GET /admin` request to **Burp Repeater**.

**Step 5: Fake "local"**

- Change the Host header to: `localhost`
- Send the request.
- You're now **inside** the admin panel.
- There are links to **delete users**.

> Why this works: the server treats `Host: localhost` as "this request came from the local machine," so it trusts you.

## Part 4: Solve the lab

**Step 6: Delete Carlos**

- Change the request line to: `GET /admin/delete?username=carlos`
- Keep the Host as `localhost`.
- Send the request.
