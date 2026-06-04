# running commands

## comment & command

```sh
#!/bin/bash

#comment
# comment
echo "Hey hey" # comment
```

## execution

- create the content above in a file and save it under the name `hey.sh`
- run the following command in the folder where the `hey.sh`

```bash
chmod u+x hey.sh
./hey.sh

Hey hey
```

- the `chmod u+x hey.sh` makes the `hey.sh` file executable
- the `./hey.sh` will execute the `hey.sh` file
- the `./anyFile.sh` tells to run the file that is executable

## execution alternative (not common)

- create another file `hey2.sh`
- make the content like below, without the `#!/bin/bash`

```sh
echo "Hey hey too"
```

- stand in the same folder and run the command

```bash
bash hey2.sh
```

- this time the `#!/bin/bash` and the `chmod u+x hey2.sh` was not needed, with a simple `bash` command it did run, but this approach is not common
