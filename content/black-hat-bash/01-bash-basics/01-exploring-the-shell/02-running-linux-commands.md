# running linux commands

> version of the bash

```
bash --version
```

> manual for a command -> explains a command and its options

```
man ls
```

> commands can have arguments

```
ls -a
ls --all
mkdir dir1
```

- `-` and `--` are predefined arguments called options (flags)
- `dir1` given by the user called operands
- `-` for short-form syntax
- `--` for long-form syntax

> multiple argument

```
ls -l --all
mkdir dir1 dir2
```

- `-l -all` -> multiple options can be present
- `dir2 dir3` -> some commands can have multiple operands

> combine multiple short-form syntax options

```
ls -l -a
ls -la
```

- only for short-form syntax
