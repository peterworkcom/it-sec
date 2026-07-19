# while

> `while` runs it's code block while the condition returns successful exit status code

```
while condition; do
    # run this code block while the condition is true
done
```

- the condition comes after the `while` keyword
- the code block for loop is in between the `do` and `done` keywords

## infinite loop

> can create an infinite loop with `true` for condition

- the `true` returns a 0 (successful) exit code
- with `ctrl+c` can cancel the script, exit the infinite loop

```sh
#!/bin/bash

while true; do
    echo "zerg rush"
    sleep 1
done
```

- it will loop while it not canceled

**the `sleep 1` pauses the loop for 1 sec**

## loop till match

> lets create a file search loop that loops while the actual file was not found

```sh
#!/bin/bash

FILE="carrier"

while [[ ! -f "${FILE}" ]]; do
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

> the `-f "${FILE}"` returns `false` while no file, but with the `!` turns it the opposite, so the `while` condition is `true` while no file

- in a `until` loop the `!` operator will not be needed for the same result
