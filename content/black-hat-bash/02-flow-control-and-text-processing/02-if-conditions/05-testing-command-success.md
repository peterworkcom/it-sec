# testing command success

> can test the commands exit code to see if it was successful

```
if command; then
    # command was successful
fi

if ! command; then
    # command was NOT successful
fi
```

- `if` runs everything as a command ([more details](?file=black-hat-bash/02-flow-control-and-text-processing/02-if-conditions/02-under-the-hood))

```sh
#!/bin/bash

if touch file.txt; then
    echo "file was created"
fi
```

> using command results in an if condition can help to resolve or log failed commands like:

- lack of permission
- command not available
- disk is full
- network is down during download
