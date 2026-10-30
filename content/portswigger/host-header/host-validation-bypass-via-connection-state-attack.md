# [Host validation bypass via connection state attack](https://portswigger.net/web-security/host-header/exploiting/lab-host-header-host-validation-bypass-via-connection-state-attack)

## The idea (in plain words)

- The front-end server checks the **Host header**.
- But it only checks the **first** request on a connection.
- Every request after that is trusted.

> So we send a **safe first request**, then a **sneaky second request** down the **same connection**.

## Part 1: Set up two tabs

- Send the `GET /` request to **Repeater**.
- Change two things:
- Path -> `/admin`
- Host header -> `192.168.0.1`
- Send it.
- You get redirected to the homepage. That is expected for now.
- **Duplicate** the tab, or copy it
- Put **both tabs** into a **new group**.

## Part 2: Fix the first tab

- Click the **first tab**.
- Change it back to normal:
- Path -> `/`
- Host header -> `xxx.h1-web-security-academy.net`
- This is the "safe" request that passes the check.

## Part 3: Send both together

- Next to the **Send** button, open the drop-down.
- Choose **Send group in sequence (single connection)**.
- Change the `Connection` header to (if needed):

```
Connection: keep-alive
```

- Send the sequence.
- Check the responses.
- The **second** request now reaches the **admin panel**.

## Part 4: Find the delete form

- Look at the admin panel response.
- Find and note these **three things**:
- Action -> `/admin/delete`
- Input name -> `username`
- The **csrf token**

## Part 5: Delete carlos

- Go to the **second tab**.
- Build this request:

```
POST /admin/delete HTTP/1.1
Host: 192.168.0.1
Cookie: _lab=YOUR-LAB-COOKIE; session=YOUR-SESSION-COOKIE
Content-Type: application/x-www-form-urlencoded
Content-Length: CORRECT

csrf=yyy&username=carlos
```

- **Content-Length** must match the body exactly. Burp can fix this for you.
- The **csrf token** must be the fresh one from Step 9.
- Send the group in sequence again (single connection).
