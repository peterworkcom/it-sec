# Exploring The Shell

> version of the bash

```
bash --version
```

> list the environmental variables

```
env
```

> write individual variables

```
echo ${SHELL}
```

or

```
echo $SHELL
```

- the `${}` used to be explicit where the variable starts and ends

```
name="duck"
say="quack"
echo ${name}@${say}
```

-> `duck@quack`

> generate a random integer in the range 0 to 32767

```
echo ${RANDOM}
```

`echo $((RANDOM % 100))` -> 0–99
`echo $((RANDOM % 100 + 1))` -> 1–100
`echo $((RANDOM % (max - min + 1) + min))` -> arbitrary range [min, max]

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
