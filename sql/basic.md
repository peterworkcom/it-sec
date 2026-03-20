## Start MySQL app

`mysql -u root -p`

## SQL commands

following commands in the `mysql`

like `mysql> CREATE DATABASE test_db;`

`database_name` is the example database in the following

### create a database

`CREATE DATABASE database_name;`

### show databases

`SHOW DATABASES;`

### focusing on one database

`USE database_name;`

### delete a database

`DROP database database_name`

### table types

`PRIMARY KEY` - uniquely identify tabel rows

`NOT NULL` - can not be empty

`INT` - integer

`AUTO_INCREMENT` - for integer it increase automatically

`VARCHAR(255)` - variable characters (text/numbers/punctuation) and a limit of 255 characters

`DATE` - date

### create a table

```
CREATE TABLE example_table_name (
    example_column1 data_type,
    example_column2 data_type,
    example_column3 data_type
);
```

like

```
CREATE TABLE book_inventory (
    book_id INT AUTO_INCREMENT PRIMARY KEY,
    book_name VARCHAR(255) NOT NULL,
    publication_date DATE
);
```

### show table in a database

`SHOW TABLES;`

### show a table

`DESCRIBE table_name;`

### alter/add column to a table

```
ALTER TABLE table_name
ADD new_column INT;
```

### delete a table

`DROP TABLE table_name;`
