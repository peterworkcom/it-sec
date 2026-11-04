# capturing terminal session activity

- with a script in the `.bashrc` you can capture every terminal session
- or just have it as a script and run it only if a terminal session needs to be captured

```sh
#!/bin/bash

FILENAME=$(date +%m_%d_%Y_%H:%M:%S).log

if [[ ! -­d "$HOME/sessions" ]]; then
    mkdir "$HOME/sessions"
fi

# Starting a script session
if [[ -­z $SCRIPT ]]; then
    export SCRIPT="$HOME/sessions/${FILENAME}"
    script -­q -­f "${SCRIPT}"
fi
```

## breakdown

> create a file name like `24_12_2000_14:30:00.log`

```sh
FILENAME=$(date +%m_%d_%Y_%H:%M:%S).log
```

- `date` -> gets the current date and time
- `+%m_%d_%Y_%H:%M:%S` -> format: month, day, year, hour, minute, second

> create a `~/sessions` folder if not exist in the users home directory

```sh
if [[ ! -­d "$HOME/sessions" ]]; then
    mkdir "$HOME/sessions"
fi
```

> check if the `SCRIPT` is already has a value

```sh
if [[ -z $SCRIPT ]]; then
```

- the recording opens a new shell, this new shell runs this script again
- without this check, it would start recording over and over in a loop

> if not then create a value for the `SCRIPT`

```sh
export SCRIPT="$HOME/sessions/${FILENAME}"
```

- `export` passes it to the new shell.
- the new shell sees `SCRIPT` is NOT empty, so the prev check fails in the new session, the recording do not start again

> the actual recording

```sh
script -q -f "${SCRIPT}"
```

- `script` is the tool that records the terminal
- `-q` means quiet, no start/stop messages
- `-f` means save to the file right away, after each output, this way nothing is lost if the terminal closes suddenly
