# variables

> variables are names that assigned to memory locations that holds the value

> in bash variables are untyped, all considered as character strings, but there are arithmetics operations, arrays, key-value pairs

## assigning and accessing variables

> create a `say` variable with a `"quack"` value

```bash
say="quack"
```

or

```bash
say=quack
```

- there are no special characters in the value `quack` so it can be declared both ways, bash will understand it as string

> re-declare variable

```bash
say="quack quack"
```

- re-declaring the variable with a new value will overwrite it
- since there is a special character (whitespace) in between the `"quack quack"` it needs to be quoted
- the `say = "quack quack"` would fail, no whitespace around the operator (`=`)

> use the `say` variable

```bash
echo "the duck says ${say}"
```

or

```bash
echo "the duck says $say"
```

- the `$` usage difference more visible in this script:

```bash
animal="duck"
echo "there are a lot of ${animal}s" # acceptable
echo "there are a lot of $animals" # no "animals" variable
```

> command substitution syntax

```bash
looksy=$(ls -la)
echo ${looksy}
```

- it just "floods" out the result of the `ls -la`

## unassigned variables

```bash
duck="quack"
echo ${duck}
unset duck
echo ${duck}
```

- the `unset` duck will return nothing

## scoping variables

> `global` variables are available the entire program, but the `scoped` (`local`) variables only available in their respective code blocks

```sh
#!/bin/bash

dragoon="have returned"

say_it() {
    marine="rock n roll"
    local zergling="say unspeakable things"
    echo "while the marine ${marine}, the dragoon ${dragoon}, but the zergling ${zergling}"
}

say_it

echo "while the marine ${marine}, the dragoon ${dragoon}, but the zergling ${zergling}"
```

> run the script

```bash
chmod u+x script.sh
./script.sh

while the marine rock n roll, the dragoon have returned, but the zergling say unspeakable things
while the marine rock n roll, the dragoon have returned, but the zergling
```

- only the `zergling` don't have value at the second `echo`
- only the `local` keyword makes the variable `scoped`
- even the `marine` variable is in the `say_it()` function `scope`, it still a `global` variable
