# [Accessing private GraphQL posts](https://portswigger.net/web-security/graphql/lab-graphql-reading-private-posts)

- Open the blog page in Burp's browser
- Go to **Proxy -> HTTP history**
- Look for the GraphQL request that lists blog posts: `POST /graphql/v1`
- Check the post IDs in the response
- Notice: **ID 3 is missing**
- This is a strong sign of a hidden post

> See if the API will reveal its own schema.

- on the same `POST /graphql/v1` in repeater
- In Repeater, right-click the request body
- Choose: **GraphQL -> Set introspection query**
- Click **Send**
- Look through the response for a type called `BlogPost`
- Confirm it has a field called `postPassword`
- use a [visualizer](https://nathanrandal.com/graphql-visualizer/) to a better understanding
- This tells you the password field **exists**, even though it's not normally shown.

> Use ID 3 to unlock the secret field.

- visit a blog then go back to the home page
- it should have the same `POST /graphql/v1` but with the `"variables":{"id":x}` (x is the blog you visited)
- send it to the repeater
- Click the **GraphQL tab**
- In **Variables**, change `id` to `3`
- In the **Query** panel, add `postPassword` as a field to return (under the `paragraphs` field)
- Click **Send**
- submit the returned password
