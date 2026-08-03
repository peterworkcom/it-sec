# NoSQL injection

> NoSQL refers to a family of databases that store and manage data without using the traditional relational (table-based) model that SQL databases like MySQL or PostgreSQL use

> the name is often read as "not only SQL," since many of these systems don't rely on fixed schemas or SQL as their primary query language

> an attacker is able to interfere with the queries that an application makes to a NoSQL database

- Bypass authentication or protection mechanisms
- Extract or edit data
- Cause a denial of service
- Execute code on the server

## Types of NoSQL injection

> There are two different types of NoSQL injection:

- `Syntax injection` - This occurs when you can break the NoSQL query syntax, enabling you to inject your own payload. The methodology is similar to that used in SQL injection. However the nature of the attack varies significantly, as NoSQL databases use a range of query languages, types of query syntax, and different data structures.
- `Operator injection` - This occurs when you can use NoSQL query operators to manipulate queries.
