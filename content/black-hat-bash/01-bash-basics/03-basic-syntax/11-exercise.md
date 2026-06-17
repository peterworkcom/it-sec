# exercise

- create a `.sh` script
- the script should accepts two arguments
- the two arguments are saved in variables
- create an `output.txt` file
- print the date to the `output.txt` file whit "dd-mm-yyyy" format
- print the two arguments to the `output.txt` file
- make a copy of the `output.txt` file as `backup.txt`
- print the `output.txt` file content to the screen

```sh
#!/bin/bash

FIRST="${1}"
LAST="${2}"

touch output.txt

date "+%d-%m-%Y" > output.txt
echo "${FIRST} ${LAST}" >> output.txt

cp output.txt backup.txt
cat output.txt
```
