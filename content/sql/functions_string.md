# String Functions

Strings functions perform operations on a string, returning a value associated with it.

## CONCAT() Function

```
SELECT CONCAT(column_1, " concat text 1 ", column_2, " concat text 2.") AS temp_column_name FROM actual_table;
```

like

```
SELECT CONCAT(name, " is a type of ", category, " book.") AS book_info FROM books;
```

## GROUP_CONCAT() Function

Group by a selected column and Concat the same groups from the selected column:

like

<table>
    <thead>
        <tr>
            <th>
                <strong>Category</strong>
            </th>
            <th>
                <strong>Names</strong>
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Category A</td>
            <td>
                <span>Name 11, Name 12 ...</span>
            </td>
        </tr>
        <tr>
            <td>Category b</td>
            <td>
                <span>Name 21, Name 22 ...</span>
            </td>
        </tr>
    </tbody>
</table>

so

```
SELECT column_1, GROUP_CONCAT(column_2 SEPARATOR ",") AS temp_column_name
    FROM actual_table
    GROUP BY column_1;
```

like

```
SELECT category, GROUP_CONCAT(name SEPARATOR ",") AS books
    FROM books
    GROUP BY category;
```

## SUBSTRING() Function

```
SELECT SUBSTRING(column_1, 1, 4) AS temp_column_name FROM actual_table;
```

like

```
SELECT SUBSTRING(published_date, starting_index, length) AS published_year FROM books;
```

## LENGTH() Function

```
SELECT LENGTH(column_1) AS temp_colum_name FROM actual_table;
```

like

```
SELECT LENGTH(name) AS name_length FROM books;
```
