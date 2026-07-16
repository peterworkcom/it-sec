# under the hood

## `if` runs a command, not an expression

`if COMMAND; then ...; fi`

- `if` always needs something it can execute

## `true`/`false` are commands

> `true` is a command and it returns 0

```sh
#!/bin/bash

if true; then
    echo "rock n roll"
fi
```

> `false` is a command and it returns 1

```sh
#!/bin/bash

if false; then
    echo "never gonna see me"
fi
```

## `[[ ]]` -> test context (strings, files, patterns)

> evaluates the conditions in between the `[[ ]]` and returns with an exit code what will be executed as a command

- inside the `[[ ]]` everything is treated as a test expression about strings and files
- uses word operators, not math symbols.

```
[[ "$a" == "hello" ]]      # string equality
[[ "$a" != "$b" ]]         # string inequality
[[ -f file.txt ]]          # does file.txt exist as a regular file?
[[ -z "$s" ]]              # is string empty?
[[ -n "$s" ]]              # is string non-empty?
[[ "$a" < "$b" ]]          # string sorts before (alphabetical)
```

## `(( ))` -> arithmetic context

> evaluates the conditions in between the `(( ))` and returns with an exit code what will be executed as a command

- inside the `(( ))` everything is treated as math
- numbers, + - \* / %, comparisons with < > == != <= >=, even ++ and --

```
(( 3 > 2 ))        # true
(( 5 % 2 ))        # 5 mod 2 = 1 -> nonzero -> true
(( x = 4 + 1 ))    # assigns 5 to x (real assignment!)
(( x > 10 ))       # compares numerically
(( 0 ))            # arithmetic 0 -> false (exit 1)
(( 1 ))            # arithmetic nonzero -> true (exit 0)
```

---

| Want to...              | Use     | Example              |
| ----------------------- | ------- | -------------------- |
| Compare numbers         | `(( ))` | `(( x > 5 ))`        |
| Math / assignment       | `(( ))` | `(( total += 1 ))`   |
| Compare strings         | `[[ ]]` | `[[ "$a" == "$b" ]]` |
| Test a file             | `[[ ]]` | `[[ -f path ]]`      |
| Pattern / regex match   | `[[ ]]` | `[[ "$s" =~ ^x ]]`   |
| Old/POSIX portable test | `[ ]`   | `[ "$a" = "$b" ]`    |
