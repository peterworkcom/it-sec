# input prompting

> during the script run asking the user for input

- create a file `input_prompting.sh`

```sh
#!/bin/bash

echo "first name:"
read -r firstname

echo "last name:"
read -r lastname

echo "rock n roll ${firstname} ${lastname}"
```

- execute

```bash
chmod u+x input_prompting.sh
./input_prompting.sh
```

- `read -r <variable_name>` will read from the console and store the value under the given variable name
