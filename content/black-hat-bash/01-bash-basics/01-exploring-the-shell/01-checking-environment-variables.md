# checking environment variables

> list the environmental variables

```bash
env
```

> write individual variables

```bash
echo ${SHELL}
```

or

```bash
echo $SHELL
```

- the `${}` used to be explicit where the variable starts and ends

```bash
name="duck"
say="quack"
echo ${name}@${say}

duck@quack
```

> generate a random integer in the range 0 to 32767

```bash
echo ${RANDOM}
```

`echo $((RANDOM % 100))` -> 0–99
`echo $((RANDOM % 100 + 1))` -> 1–100
`echo $((RANDOM % (max - min + 1) + min))` -> arbitrary range [min, max]
