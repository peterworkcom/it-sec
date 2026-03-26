# sqli login

if a login requires only a successful sql query:

`SELECT * FROM users WHERE username = 'wiener' AND password = 'bluecheese'`

then commenting out the the password part will return a successful sql query:

`SELECT * FROM users WHERE username = 'administrator'--' AND password = ''`

and lets the attacker login in only with a known username
