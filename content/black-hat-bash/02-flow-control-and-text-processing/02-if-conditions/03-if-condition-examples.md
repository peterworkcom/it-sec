# if condition examples

> `example_1.sh`

```sh
#!/bin/bash

FILENAME="zergling.txt"

if [[ -f "${FILENAME}" ]]; then
    echo "${FILENAME} exist"
    exit 1
else
    touch "${FILENAME}"
fi
```

- checks if a file `-f` zergling.txt exist
- if it is it exits with 1
- other wise it creates it

> `example_2.sh`

```sh
#!/bin/bash

FILENAME="zergling.txt"

if [[ ! -f "${FILENAME}" ]]; then
    touch "${FILENAME}"
fi
```

- same, checks if the file does exist
- it does not exist but the with `!` it turns the conditions the opposite
- **`!` not** -> will result true
- it creates the file
- shorter implementation but without feedback

> `example_3.sh`

```sh
#!/bin/bash

VARIABLE_ONE="zergling"
VARIABLE_TWO="zergling"

if [[ "${VARIABLE_ONE}" == "${VARIABLE_TWO}" ]]; then
    echo "the variables are equal"
else
    echo "the variables are NOT equal"
fi
```

- checks if two variables are equal

> `example_4.sh`

```sh
#!/bin/bash

NUMB_ONE="13"
NUMB_TWO="22"

if [[ "${NUMB_ONE}" -gt "${NUMB_TWO}" ]]; then
    echo "${NUMB_ONE} is greater then ${NUMB_TWO}"
else
    echo "${NUMB_ONE} is lesser or equal to ${NUMB_TWO}"
fi
```

- compare two integers with the `-gt` (greater then) operator

> `example_5.sh`

```sh
#!/bin/bash

echo "give a number:"
read -r numb

if [[ "${numb}" -gt "10" ]]; then
    echo "greater then 10"
else
    echo "lesser or equal to 10"
fi
```

- give it a try with `[]` and `[[]]` it will give back the same result
