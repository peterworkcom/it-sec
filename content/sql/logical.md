# Logical operators

Logical operators return `TRUE` or `FALSE`

## LIKE operator

```
SELECT *
    FROM actual_table
    WHERE column_1 LIKE "%key_word%";
```

like

```
SELECT *
    FROM books
    WHERE description LIKE "%guide%";
```

filteres the description where there are words "guide"

## AND operator

```
SELECT *
    FROM actual_table
    WHERE column_2 = "condition one" AND column_2 = "condition two";
```

like

```
SELECT *
    FROM books
    WHERE category = "Offensive Security" AND name = "Bug Bounty Bootcamp";
```

classic `AND` (&&) operator

## OR operator

```
SELECT *
    FROM actual_table
    WHERE column_1 LIKE "%key word 1%" OR column LIKE "%key word 2%";
```

like

```
SELECT *
    FROM books
    WHERE name LIKE "%Android%" OR name LIKE "%iOS%";
```

classic `OR` (||) operator

## NOT operator

```
SELECT *
    FROM actual_table
    WHERE NOT column_1 LIKE "%key%";
```

like

```
SELECT *
    FROM books
    WHERE NOT description LIKE "%guide%";
```

or

```
SELECT *
    FROM books
    WHERE description NOT LIKE "%guide%";
```

`NOT` on a different position

negats the result like `!` in JS

## BETWEEN Operator

```
SELECT *
    FROM actual_table
    WHERE id BETWEEN value_1 AND value_2;
```

like

```
SELECT *
    FROM books
    WHERE id BETWEEN 2 AND 4;
```

results value between 1 and 4 having them in the result
