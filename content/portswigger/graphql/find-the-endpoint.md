# [Finding a hidden GraphQL endpoint](https://portswigger.net/web-security/graphql/lab-graphql-find-the-endpoint)

> Find the hidden GraphQL endpoint. Then delete the user `carlos`.

## Find the endpoint

- Open **Burp Suite** and open the lab in **Burp Browser**
- in **Burp Suite** send the `/` request to the **Repeater**.
- Try common GraphQL endpoint names like `/api`
- Send a **GET** request to `/api`.
- Look at the response.
- If you see `"Query not present"` -> good sign.
- This means a GraphQL endpoint may be here.

## Confirm it is GraphQL

- Add a simple query to the URL.
- Use this exact request:

```
/api?query=query{__typename}
```

- Check the response. It should look like this:

```json
{
  "data": {
    "__typename": "query"
  }
}
```

> This confirms it is a GraphQL endpoint.

## Try introspection (first attempt)

Introspection = asking GraphQL to describe its own schema.

- Right-click the request in Repeater.
- Choose **GraphQL -> Set introspection query**.
- It will add it to the `/api?query=query{__typename}`
- Send the request.

**Result:** It will be blocked.

> The server has a filter that blocks normal introspection queries.

## Bypass the filter

The filter blocks the exact text `__schema{` (no space -> filter strips the white spaces).

**Trick:** Add a newline in between the `__schema` and the `{`.

- Find this part of the query:
  ```
  __schema {
  ```
- Should look like this

```
__schema+%7b
```

- Add the new line to it (`%0a`)

```
__schema%0a+%7b
```

- Resend the request.

**Why this works:**
The filter only matches `__schema{` with no space (filter strips the white spaces). Adding a newline makes the query still valid, but it no longer matches the filter.

> You should now see the **full schema** in the response.

## Save the discovered queries

- Right-click the request.
- Choose **GraphQL -> Save GraphQL queries to site map**.

---

Burp Suite reads that schema and does the work for you: each of the available queries that Burp discovered during introspection is saved as a node on the site map, so you can examine them and send them to Repeater to start your attack.

---

- Go to **Target -> Site map**.
- Check the `/api?query=` entries
- You should now see a list of queries and mutations, including:
- `getUser`
- `deleteOrganizationUser`

## Find carlos's user ID

- Find the `getUser` query in the site map.
- Right-click it -> **Send to Repeater**.
- Open the **GraphQL tab** in Repeater.
- Change the `id` variable to any numbers and test for users
- Keep trying until the response returns `carlos`'s data.

## Delete carlos

1. Find the `deleteOrganizationUser` mutation in the site map.
2. Send it to Repeater.
3. Set the `id` to carlos's user ID.
4. Send the request.
