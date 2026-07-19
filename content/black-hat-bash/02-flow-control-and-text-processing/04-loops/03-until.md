# until

> `until` runs it's code block until the condition returns failed exit status code

```
until condition; do
    # run this code block until the condition is false
done
```

- the condition comes after the `until` keyword
- the code block for loop is in between the `do` and `done` keywords

## infinite loop

> can create an infinite loop with `false` for condition

- the `false` returns a 1 (failed) exit code
- with `ctrl+c` can cancel the script, exit the infinite loop

```sh
#!/bin/bash

until false; do
    echo "zerg rush"
    sleep 1
done
```

- it will loop until it canceled

**the `sleep 1` pauses the loop for 1 sec**

## loop till match

> lets create a file search loop that loops until the actual file was found

```sh
#!/bin/bash

FILE="carrier"

until [[ -f "${FILE}" ]]; do
    echo "warping..."
    sleep 2
done

echo "carrier has arrived"
```

- run the script
- open a new terminal
- align the two terminal, so both visible
- in the new terminal create a new file: `touch carrier`
- the loop should stop on that specific file creation

> the `-f "${FILE}"` returns `false` until no file

- compare to the `while` loop this does not have the `!` operator, for the same result
