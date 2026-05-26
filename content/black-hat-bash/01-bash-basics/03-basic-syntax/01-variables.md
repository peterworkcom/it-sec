# variables

> variables are names that assigned to memory locations that holds the value

> in bash variables are untyped, all considered as character strings, but there are arithmetics operations, arrays, key-value pairs

## assigning and accessing variables

> create a `say` variable with a `"quack quack"` value

```
say="quack quack"
```

- the `say = "quack quack"` would fail, no whitespace around the operator (`=`)

> use the `say` variable

```
echo "the duck says ${say}"
```

or

```
echo "the duck says $say"
```

- the `$` usage difference more visible in this script:

```
animal="duck"
echo "there are a lot of ${animal}s" # acceptable
echo "there are a lot of $animals" # no "animals" variable
```

> command substitution syntax

```
looksy=$(ls -la)
echo ${looksy}
```
