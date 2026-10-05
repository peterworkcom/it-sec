# [Accidental exposure of private GraphQL fields](https://portswigger.net/web-security/graphql/lab-graphql-accidental-field-exposure)

- Open the lab. Click **My account**.
- Try to log in (any details).
- In Burp, go to **Proxy > HTTP history**.
- Find the login request. It's a GraphQL message with username and password.
  Right-click it. Choose **Send to Repeater**.
- In Repeater, right-click the request box.
- Choose **GraphQL > Set introspection query**.
- Click **Send**.
- use a [visualizer](https://nathanrandal.com/graphql-visualizer/) to a better understanding
- Right-click the response. Choose **GraphQL > Save GraphQL queries to site map**.

> Get the Admin's Login

- Go to **Target > Site map**. Look through the GraphQL queries
- find the one with **getUser** query
- Right-click the **getUser** query. Choose **Send to Repeater**.
- Click **Send**.
- Default `id` is `0`. This returns nothing.
- Click the **GraphQL** tab.
- Try different `id` numbers.
- **id = 1** works. This returns the admin's username and password.
- Log in as the **administrator**, and delete carlos
