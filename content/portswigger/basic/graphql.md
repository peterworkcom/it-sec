# GraphQL API Vulnerabilities

> GraphQL problems usually come from **bad setup or design**. Attackers send harmful requests to steal data or do things they shouldn't be allowed to do.

## Step 1: Find the endpoint

GraphQL uses **one endpoint** for all requests, so finding it is valuable.

**The universal test query:**

- Send `query{__typename}`
- A GraphQL endpoint will reply with `"__typename": "query"`

**Common places to try:**

- `/graphql`
- `/api`
- `/api/graphql`
- `/graphql/api`
- `/graphql/graphql`
- Add `/v1` to any of these if nothing works

**Also try different request methods:**

- Safe setups only accept POST with JSON
- Weaker setups may accept GET or form-encoded POST

## Step 2: Test the arguments

If the API lets you ask for items by ID, it may have an **IDOR** (insecure direct object reference). This means you can see data you shouldn't.

**Example:**

- A shop lists products 1, 2 and 4
- Product 3 is missing, so it may be hidden
- Ask for `product(id: 3)` directly
- You get the hidden product's details

## Step 3: Find the schema

The schema is the map of how the API works.

### Introspection

- It is a built-in GraphQL feature
- It lets you ask the server about its own schema
- It should be **off in production**, but often isn't

**Quick check:**

- Send `{__schema{queryType{name}}}`
- If you get names back, introspection is on

**Full query tips:**

- A full introspection query returns everything: queries, mutations, types and more
- If it fails, remove `onOperation`, `onFragment` and `onField`
- The results are very long, so use a **GraphQL visualizer** to see them as a picture

### Suggestions

- Works even when introspection is off
- Apollo servers may reply with "Did you mean...?" in error messages
- These hints leak real parts of the schema
- The tool **Clairvoyance** uses this to rebuild the schema
- To fix: use `hideSchemaDetailsFromClientErrors` in Apollo Server v4+
