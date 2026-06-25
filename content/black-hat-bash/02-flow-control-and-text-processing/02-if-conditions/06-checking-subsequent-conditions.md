# checking subsequent conditions

> on first conditions false there is an option to check for a secondary condition with different result compare to the first

```
if condition_1; then
    # first condition true
    # this section will return only
elif condition_2; then
    # first condition false, and second condition is true
    # this section will return only
else
    # first and second condition false
    # this section will return only
fi
```

- `elif` is a subsequent condition check only after a first `if` check what might fail

## example

`check.sh`

```bash
#!/bin/bash

USER_INPUT=${1}

if [[ -z ${USER_INPUT} ]]; then
    echo "parameter missing"
    exit 1
fi

if [[ -f ${USER_INPUT} ]]; then
    echo "parameter is a file"
elif [[ -d ${USER_INPUT} ]]; then
    echo "parameter is a directory"
else
    echo "parameter does not exist"
fi
```

> consider the following:

- have a file and a folder in the folder

```sh
touch zergling.txt
mkdir marine
```

- run the `check.sh` with those parameters plus with one that does not exist

```sh
./check.sh zergling.txt
./check.sh marine
./check.sh zealot
```
