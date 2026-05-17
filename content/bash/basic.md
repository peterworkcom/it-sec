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

duck@quack
```
