# linking conditions

> evaluating multiple conditions in `if` brackets

## `&&`

```bash
#!/bin/bash

echo "content" > file.txt

if [[ -f "file.txt" ]] && [[ -s "file.txt" ]]; then
    echo "file exists and have has size greater size then 0"
fi
```

- around the `&&` both conditions have to met to execute the `if` content
- either `false` and the `if` condition content will be ignored

## `||`

```bash
#!/bin/bash

NUMBER="11"

if [[ "${NUMBER}" -gt "10" ]] || [[ "${NUMBER}" -lt "10" ]]; then
    echo "number not equal to 10"
fi
```

- around the `||` one of the conditions have to met to execute the `if` content
- at least one condition need to result to `true`
