# if conditions

> use `if` conditions to execute a code only if the certain conditions met

```
if [[ conditions ]]; then
    # execute code block if conditions met
else
    # execute code block if do not conditions met
fi
```

- starts with an `if`
- conditions in a `[[]]` or `[]`
- close the conditions with a `;`
- `then` keyword to introduce the code block on met conditions
- `else` to introduce the code block on failed conditions
- `fi` is to finish the statement

> not every shell uses `[[]]` for conditions some of the uses only `[]`

- `bash` is a feature rich shell and `[[]]` is one of its features
- in other shells that follow `POSIX` (Portable Operating System Interface) standards, the `[]` would work, as it works on `bash` too, but the `[[]]` might break
- `bash` is a superset of `POSIX`, so it has those standards but added a few more

```
if [ conditions ]; then
    # execute code block if conditions met
else
    # execute code block if do not conditions met
fi
```

- the `[]` works in `bash` too

## `[]` and `[[]]` caveats

> the `conditions` and the `[]` needs to have a whitespace in between

- this would throw an error

```
if [conditions]; then
or
if [[conditions]]; then
```

- the correct version is

```
if [ conditions ]; then
or
if [[ conditions ]]; then
```

> difference between `[]` vs `[[]]`

- `[]` is a command (strict) for `#!/bin/sh` and `#!/bin/bash`
- `[[]]` is a keyword (more forgiving) only for `#!/bin/bash`

```
numb=""
[ $numb -gt 10 ]   # ERROR: expands to [ -gt 10 ] -> broken
[[ $numb -gt 10 ]] # safe, but errors differently (empty isn't a number)
```

```
word=""
[ $word = "hi" ]   # ERROR: [ = hi ] -> syntax error
[[ $word = "hi" ]] # fine -> evaluates to false, no crash
```

## `!` negate

```
if [[ ! conditions ]]; then
```

- the condition(s) result will be true or false but with `!` the result will be the opposite

```bash
true; echo $?
! true; echo $?
```
