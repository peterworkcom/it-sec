# control operators

| operator | name          | description                                                       |
| -------- | ------------- | ----------------------------------------------------------------- |
| `&`      | background    | send command to the background                                    |
| `&&`     | logical `AND` | run the next command only if the previous one succeeded           |
| `\|`     | pipe          | redirect the output of a command as an input to another           |
| `\|\|`   | logical `OR`  | run the next command only if the previous one failed              |
| `;`      | sequence      | run commands one after another, regardless of exit status         |
| `;;`     | termination   | end a case statement (later more details)                         |
| `()`     | grouping      | group commands, run commands in a `subshell` (later more details) |

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

## `&&` logical `AND`

> create a folder then move in the folder

```bash
mkdir dir && cd dir
```

> move back and try again the same command

```bash
cd ..
mkdir dir && cd dir

mkdir: cannot create directory ‘dir’: File exists
```

- as the first command failed the second will not be executed

## `|` pipe

> redirect the output

- translates `stdout` to `stdin`

```bash
ls | wc -l

# number of lines
```

- `ls` lists the files in the current directory
- `|` passes that list to the next command
- `wc -l` counts the number of lines
- `#` the number of lines

## `||` logical `OR`

> run the next command only if the previous one failed

```bash
mkdir differentDir || cd differentDir
```

- it did not move in the folder because the first command was successful

> try again

```bash
mkdir differentDir || cd differentDir
```

- since the folder is already created the first command failed
- since the first command failed, it moved in the `differentDir` folder

## `;` sequence

> run commands one after another, regardless of exit status

```bash
mkdir anotherDir || cd anotherDir
```

> try again

```bash
cd ..
mkdir anotherDir || cd anotherDir
```

- no matter if the `anotherDir` exist or not it will enter the `anotherDir`
