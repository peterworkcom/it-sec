# control operators

| operator | name          | description                                               |
| -------- | ------------- | --------------------------------------------------------- |
| `&`      | background    | send command to the background                            |
| `&&`     | logical `AND` | run the next command only if the previous one succeeded   |
| `\|`     | pipe          | redirect the output of a command as an input to another   |
| `\|\|`   | logical `OR`  | run the next command only if the previous one failed      |
| `;`      | sequence      | run commands one after another, regardless of exit status |
| `;;`     | termination   | end a case statement (later more details)                 |
| `()`     | grouping      | group commands, run commands in a `subshell`              |

## background `&`

> will sleep for 10 seconds, blocking the next command

```sh
#!/bin/bash

echo "sleep for 10 seconds"
sleep 10

echo "what happened?!"
```

> will put the sleep to run in the background so it does not blocks the nex command

```sh
#!/bin/bash

echo "sleep for 10 seconds"
sleep 10 &

echo "& have no time for this!"

```
