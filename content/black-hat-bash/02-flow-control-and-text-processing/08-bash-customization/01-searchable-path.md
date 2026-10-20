# placing scripts in searchable paths

> the `PATH` variable holds the directories what `bash` looks up when a command given in the terminal

```bash
echo $PATH
```

- commands like `ls` available because it is in one of the `PATH` folder
- if you want a script or app run from the terminal, place it in one of the `PATH` folder or make a link to it from one of the `PATH` folder

> alternative options

- call a script using full path
- change the directory where the script is
- use aliases (later)
- add new path to the PATH environment variable
