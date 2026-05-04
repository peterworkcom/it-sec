# Comparison Operators

The comparison operators are used to compare values and check if they meet specified criteria.

## Equal To Operator =

```
SELECT *
    FROM actual_table
    WHERE column_1 = "value";
```

like

```
SELECT *
    FROM books
    WHERE name = "Designing Secure Software";
```

it needs to be specific

## Not Equal To Operator !=

```
SELECT *
    FROM actual_table
    WHERE column_1 != "value";
```

like

```
SELECT *
    FROM books
    WHERE category != "Offensive Security";
```

## Less Than (or Equal To) and Greater Than (or Equal To) Operators < > <= >=

```
SELECT *
    FROM actual_table
    WHERE column_1 < "value";
```

like

```
SELECT *
    FROM books
    WHERE published_date < "2020-01-01";
```

#### OR

```
SELECT *
    FROM actual_table
    WHERE column_1 >= "value";
```

like

```
SELECT *
    FROM books
    WHERE id >= 4;
```
