## CRUD

Create, Read, Update, and Delete.

### Select a database

`use thm_books;`

### Create Operation (INSERT)

```
INSERT INTO actual_table (id, name, published_date, description)
    VALUES (1, "added name", "2014-10-14", "added description");
```

### Read Operation (SELECT)

`SELECT * FROM actual_table;`

#### Specific Read

`SELECT column_1, column_2 FROM actual_table;`

like

`SELECT name, description FROM books;`

### Update Operation (UPDATE)

```
UPDATE actual_table
    SET description = "updated description"
    WHERE id = 1;
```

### Delete Operation (DELETE)

`DELETE FROM actual_table WHERE id = 1;`
