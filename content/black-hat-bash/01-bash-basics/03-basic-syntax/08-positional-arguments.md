# positional arguments

> bash scripts can take up positional arguments (parameters) passed on the command line

- create a file `make_folder.sh`

```sh
#!/bin/bash

mkdir "${1}"
```

then

```bash
chmod +x make_folder.sh
./make_folder.sh zergling
```

- it will create a `zergling` folder

> multiple parameters

- create a file `make_more_folder.sh`

```sh
#!/bin/bash

FILE_NAME="${0}"
FOLDER_NAME_1="${1}"
FOLDER_NAME_2="${2}"

echo "script name: ${0}"
echo "created folders: ${1}, ${2}"
mkdir "${1}" ${2} # dont have to put the parameter in ""
```

then

```bash
chmod +x make_more_folders.sh
./make_more_folders.sh marine zealot
```

- it will create more folders
- the `${1}`, `${2}`, `${3}` ... represent the placement of the parameters
- the `${0}` represent the script name

> accessing all the parameters

- create a file `make_all_the_folders.sh`

```sh
#!/bin/bash

echo "number of parameters: $#"
echo "created folders: $@"
mkdir $@ # no difference with or without the ""
```

then

```bash
chmod +x make_all_the_folders.sh
./make_all_the_folders.sh stalker hydralisk firebat
```

- it will create all the folders
- the `$#` represent count of the parameters (only works in this syntax)
- the `$@` represent all of the parameters (only works in this syntax)
