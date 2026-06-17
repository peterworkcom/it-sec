# exit codes

> bash commands return with exit codes which indicates if it was successful or not

| Code    | Meaning                                                   |
| ------- | --------------------------------------------------------- |
| `0`     | Success                                                   |
| `1`     | General/catch-all error (generic failures)                |
| `2`     | Misuse of a shell builtin (wrong syntax, missing keyword) |
| `126`   | Command found but **not executable** (permission problem) |
| `127`   | Command **not found** (typo, or not in `$PATH`)           |
| `128`   | Invalid argument to `exit` (`exit 3.14`)                  |
| `128+N` | Process killed by **signal N** (see below)                |
| `130`   | Terminated by **Ctrl+C** (SIGINT, signal 2 → 128+2)       |
| `137`   | Killed (SIGKILL, signal 9 → 128+9; often the OOM killer)  |
| `143`   | Terminated (SIGTERM, signal 15 → 128+15)                  |
| `255`   | Exit status out of range (`exit -1`)                      |

`3-125`: free for scripts to use however fitted, can define your own meanings

> print the last exit code -> `$?`

- try to make the same directory twice

```bash
mkdir zergling
echo $?

0
```

```bash
mkdir zergling
echo $?

1
```

- run a command that does not exist

```bash
not_a_command
echo $?

127
```

## setting a script's exit code

- create a script `make_queen.sh`

```sh
#!/bin/bash

mkdir queen
exit 222
```

- run it

```bash
chmod u+x make_queen.sh
./make_queen.sh
echo $?

222
```

- but if you run it again it will return the same exit code, and the `1`

```bash
./make_queen.sh
echo $?

222
```
