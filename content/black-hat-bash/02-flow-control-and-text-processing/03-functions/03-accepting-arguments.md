# accepting arguments

> functions can accept arguments as scripts do

```sh
#!/bin/bash

basic_units() {
    echo "zerg: ${1}, terran: ${2}, protoss: ${3}"
}

basic_units zergling marine zealot
```

> the arguments are scoped, in the `{}` only the function arguments are available the script arguments are not

`scope.sh`

```sh
#!/bin/bash
echo "${1}"

check() {
    echo "is it here? -> ${1}"
}

check
```

- try to call the script with an argument

```bash
chmod +x scope.sh
./scopr.sh zergling

zergling
is it here? ->
```

- the script argument is not available in the function scope
