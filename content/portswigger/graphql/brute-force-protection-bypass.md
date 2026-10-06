# [Bypassing GraphQL brute force protections](https://portswigger.net/web-security/graphql/lab-graphql-brute-force-protection-bypass)

> **Goal:** Log in as `carlos` by brute-forcing the password.

> **Challenge:** A rate limiter blocks too many requests, you must get around it.

## Find the login request

- Open the lab in **Burp's browser**.
- Click **My account**.
- Try logging in with a **wrong** username/password.
- In Burp, go to **Proxy -> HTTP history**.
- Find the login request.
- It will be a **GraphQL mutation**.
- Right-click it -> **Send to Repeater**.

## Confirm the rate limit

- In Repeater, resend the login request a few times.
- Keep using wrong credentials.
- After a few tries, you should see a **rate limit error**.

> This confirms normal brute forcing won't work here.

## Understand the bypass

- **The problem:** The rate limiter counts **HTTP requests**, not how many login attempts are inside each request.

- **The trick:** Use **GraphQL aliases** to pack many login attempts into **one single HTTP request**.

> The rate limiter only sees "1 request", even though you're testing many passwords at once.

## Build the aliased request

Each login attempt needs:

- Same username: `carlos`
- A **different** password
- Its own unique alias name (`bruteforce0`, `bruteforce1`, etc.)
- A `success` field, so you can see which one worked

**Structure:**

```graphql
mutation {
    bruteforce0:login(input:{password: "123456", username: "carlos"}) {
        token
        success
    }

    bruteforce1:login(input:{password: "password", username: "carlos"}) {
        token
        success
    }

    ...

    bruteforce99:login(input:{password: "12345678", username: "carlos"}) {
        token
        success
    }
}
```

> **Password list to use:** PortSwigger's [authentication lab passwords](https://portswigger.net/web-security/authentication/auth-lab-passwords) list.

```python
passwords = ["123456", "password", "12345678", "..."]

query = "mutation {\n"
for i, pw in enumerate(passwords):
    query += f'  bruteforce{i}:login(input:{{password: "{pw}", username: "carlos"}}) {{\n'
    query += "    token\n    success\n  }\n\n"
query += "}"

print(query)
```

## Clean up the request in Repeater

> Before sending, in the **Pretty tab**:

- **Delete** the `variables` dictionary (if present).
- **Delete** the `operationName` field (if present).
- Paste your full aliased mutation in as the query body.

## Send and check the response

- Click **Send**.
- Look at the response, it will list a result for **every** alias.
- Use the **search bar** below the response panel.
- Search for: `true`

## Get the working password

- Scroll up from the `true` result.
- Find which alias it belongs to.
- Log in
