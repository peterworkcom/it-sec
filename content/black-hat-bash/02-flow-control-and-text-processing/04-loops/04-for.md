# for

> `for` iterates over a sequence and can run the code block with the actual iteration from the sequence

```
for item in list; do
    # run this code block with the actual item
done
```

- `for` is the loop keyword
- `item` is one of the element from the `list`
- `in` keyword glues the `item` and the `list` together, refers the each `item` in the `list`
- the code block for loop is in between the `do` and `done` keywords

## number sequence

- check in bash the following:

```bash
seq 1 10
```

- it prints the numbers 1 to 10

> print numbers with `for` loop

```sh
#!/bin/bash

for item in $(seq 1 10); do
    echo "item: ${item}"
done
```

> create files

`train.sh`

```sh
#!/bin/bash

for item in $@; do
    touch ${item}
done

echo "$@ units (files) are created"
```

- run the script with arguments

```bash
./train.sh zergling marine zealot
```

> list files

```sh
#!/bin/bash

for item in $(ls .); do
    echo "file: ${item}"
done
```
