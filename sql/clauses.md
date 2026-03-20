## Clauses

Clauses can help us define the type of data and how it should be retrieved or sorted.

<table>
    <thead>
        <tr>
            <th><b><strong>Clause</strong></b></th>
            <th><b><strong>Description</strong></b></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><b><strong>WHERE</strong></b></td>
            <td><span>The WHERE clause is used to filter records based on specific conditions. It is typically used in
                    SELECT, UPDATE, and DELETE queries to restrict the data that is affected by these statements. For
                    example, retrieving all employees with a salary above 50,000.</span></td>
        </tr>
        <tr>
            <td><b><strong>ORDER BY</strong></b></td>
            <td><span>The ORDER BY clause is used to sort the query results in either ascending or descending order. It
                    is commonly used with numeric, date, and text fields to organize data meaningfully, such as sorting
                    employees by their joining date.</span></td>
        </tr>
        <tr>
            <td><b><strong>GROUP BY</strong></b></td>
            <td><span>The GROUP BY clause groups records with the same values in specified columns and is used with
                    aggregate functions like COUNT(), SUM(), AVG(), etc. For example, calculating total sales per
                    region.</span></td>
        </tr>
        <tr>
            <td><b><strong>HAVING</strong></b></td>
            <td><span>The HAVING clause is similar to WHERE but is used to filter grouped records. It is used with GROUP
                    BY to apply conditions on aggregated results, such as filtering groups where the total revenue
                    exceeds a certain amount.</span></td>
        </tr>
        <tr>
            <td><b><strong>LIMIT</strong></b></td>
            <td><span>The LIMIT clause restricts the number of rows returned in a query result. This is especially
                    useful in large databases where retrieving all records could be inefficient. For example, fetching
                    the top 5 highest-paid employees.</span></td>
        </tr>
        <tr>
            <td><b><strong>TOP</strong></b></td>
            <td><span>The TOP clause, similar to LIMIT, is used in SQL Server to limit the number of rows returned. It
                    helps in retrieving a specific subset of records efficiently.</span></td>
        </tr>
        <tr>
            <td><b><strong>LIKE</strong></b></td>
            <td><span>The LIKE clause filters results using pattern matching with wildcards
                    (</span><code><span>%</span></code><span> for multiple characters and
                </span><code><span>_</span></code><span> for a single character). It is useful for searching partial
                    matches in text fields, such as finding all customers whose names start with 'J'.</span></td>
        </tr>
        <tr>
            <td><b><strong>FROM</strong></b></td>
            <td><span>The FROM clause specifies the database table from which records will be retrieved. It is a
                    fundamental part of SQL queries as it defines the source of data for SELECT, DELETE, and UPDATE
                    statements.</span></td>
        </tr>
        <tr>
            <td><b><strong>AND</strong></b></td>
            <td><span>The AND clause is used to combine multiple conditions in a query, ensuring that all conditions
                    must be met. It is useful in complex filtering scenarios, such as retrieving employees who work in a
                    specific department and have a salary above 60,000.</span></td>
        </tr>
        <tr>
            <td><b><strong>OR</strong></b></td>
            <td><span>The OR clause is used to combine multiple conditions where at least one must be true. It is useful
                    when searching for multiple criteria, such as retrieving customers from either New York or Los
                    Angeles.</span></td>
        </tr>
        <tr>
            <td><b><strong>DISTINCT</strong></b></td>
            <td><span>The DISTINCT clause is used to avoid duplicate records when doing a query, returning only unique
                    values.</span></td>
        </tr>
    </tbody>
</table>

### DISTINCT Clause

will select all:

`SELECT * FROM actual_table;`

will select only the different ones (reasonable to use only one column):

`SELECT DISTINCT column_1 FROM actual_table;`

`SELECT DISTINCT name FROM books;`

### GROUP BY Clause

The GROUP BY clause aggregates data from multiple records and groups the query results in columns. This can be helpful for aggregating functions. Can count witht the COUNT function.

```
SELECT column_1, COUNT(*)
    FROM actual_table
    GROUP BY column_1;
```

like

```
SELECT name, COUNT(*)
    FROM books
    GROUP BY name;
```

### ORDER BY Clause

The ORDER BY clause can be used to sort the records returned by a query in ascending or descending order. Using functions like ASC and DESC can help us to accomplish that, as shown below in the next two examples.

```
SELECT *
    FROM actual_table
    ORDER BY column_2 ASC;
```

like

```
SELECT *
    FROM books
    ORDER BY published_date ASC;
```

or

```
SELECT *
    FROM books
    ORDER BY published_date DESC;
```

### HAVING Clause

The HAVING clause is used with other clauses to filter groups or results of records based on a condition. In the case of GROUP BY, it evaluates the condition to TRUE or FALSE, unlike the WHERE clause HAVING filters the results after the aggregation is performed.

```
SELECT column_1, COUNT(*)
    FROM actual_table
    GROUP BY column_1
    HAVING column_1 LIKE '%word%';
```

like

```
SELECT name, COUNT(*)
    FROM books
    GROUP BY name
    HAVING name LIKE '%Hack%';
```

## Functions (not all)

<table>
    <thead>
        <tr>
            <th><b><strong>Functions (not all)</strong></b></th>
            <th><b><strong>Description</strong></b></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><b><strong>COUNT</strong></b></td>
            <td><span>Use as COUNT(*), count the groupped rows.</span></td>
        </tr>
        <tr>
            <td><b><strong>ASC/DESC</strong></b></td>
            <td><span>Signaling the solrting order.</span></td>
        </tr>
    </tbody>
</table>
