# Basic Bash

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
