# Aggregate Functions

These functions aggregate the value of multiple rows within one specified criteria in the query; It can combine multiple values into one result.

## COUNT() Function

```
SELECT COUNT(column_1) AS temp_colum_name FROM actual_table;
```

like

```
SELECT COUNT(*) AS total_books FROM books;
```

or

```
SELECT COUNT(*) FROM books;
```

## SUM() Function

```
SELECT SUM(column_1) AS temp_column_name FROM actual_table;
```

like

```
SELECT SUM(price) AS total_price FROM books;
```

or

```
SELECT SUM(price) FROM books;
```

## MIN()/MAX() Function

```
SELECT MAX(column_1) AS temp_columne_name FROM actual_table;
```

or

```
SELECT MIN(column_1) FROM actual_table;
```

like

```
SELECT MAX(published_date) AS latest_book FROM books;
```

or

```
SELECT MIN(published_date) FROM books;
```
