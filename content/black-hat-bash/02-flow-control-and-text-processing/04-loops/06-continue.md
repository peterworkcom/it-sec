# continue

> the `continue` keyword breaks the actual iteration and continues with the next iteration, it does not break the whole loop, just continue with the next

```sh
#!/bin/bash

for item in $(seq 1 10); do
    echo "#${item}"
    continue
    echo "unreachable"
done
```

> create a file check loop

```sh
#!/bin/bash

rm zergling1 zergling2 zergling3 2> /dev/null

touch zergling1 zergling2 zergling3

for zerg in zergling*; do
    if [[ "${zerg}" == "zergling2" ]]; then
        continue
    fi

    echo "evolved" > "${zerg}"
done
```

- `rm zergling1 zergling2 zergling3 2> /dev/null` -> it deletes the files if they exist if not then the error stream sent to `/dev/null` (the nothingness)
- `touch zergling1 zergling2 zergling3` -> creating the files again
- `for zerg in zergling*; do` -> loop trough every file that starts with the word `zergling`
- `zergling*` -> the `*` (glob character) makes the `zergling` glob
- `if [[ "${zerg}" == "zergling2" ]]; then ...` -> in case of `zergling2` break the actual loop
- `echo "evolved" > "${zerg}"` -> in any other case add the word "evolved" in the file
