# returning values

> functions can return values with the `return` keyword

- if there is no `return` statement, the function will return the last run command exit code

```bash
#!/bin/bash

is_root() {
    if [[ ${EUID} -eq "0" ]]; then
        return "0"
    else
        return "1"
    fi
}

if is_root; then
    echo "user is root"
else
    echo "user is NOT root"
fi
```

- the `is_root` function checks if the actual user id is equal to 0
- if it is it return 0, otherwise it return 1
- then the `is_root` called in an if condition
- on 0 it is true on 1 it is false

## alternative

```bash
#!/bin/bash

is_root() {
    [[ ${EUID} -eq "0" ]]
}

if is_root; then
    echo "user is root"
else
    echo "user is NOT root"
fi
```

> since the test `[[ ${EUID} -eq "0" ]]` has an exit code, and a function returns the last running command exit code, in this case the result is the same
