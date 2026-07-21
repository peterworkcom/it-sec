# break

> the `break` keyword breaks out from the loop, aka stops the loop at that point

```sh
#!/bin/bash

for item in $(seq 1 10); do
    echo "got only as far as ${item}"
    break
    echo "never gonna catch me"
done
```

```sh
#!/bin/bash

while true; do
    echo "no one lives forever"
    break
done
```
