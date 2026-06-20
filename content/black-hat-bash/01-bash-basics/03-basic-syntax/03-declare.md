# Declare

> `Bash` is essentially typeless, the values are considered as `string` but `Bash` reinterprets the `string` as a `number` only for the duration of an arithmetic context, then the result is a `string` again.

The `declare` builtin sets attributes on variables (functions too). `typeset` is a synonym kept for compatibility with `ksh`.

Prefix an option with `-` to **enable** it and `+` to **disable** it (e.g. `declare +x VAR` removes the export attribute). Most attributes can be combined: `declare -ir MAX=100` makes `MAX` an integer that is also read-only.

## Variable attributes

| Option | Name              | Description                                                                                                                           |
| ------ | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `-i`   | integer           | Treats the variable as an integer; assignments are evaluated as arithmetic. Non-numeric values become `0`.                            |
| `-a`   | indexed array     | Declares an indexed (numerically keyed) array.                                                                                        |
| `-A`   | associative array | Declares an associative (string-keyed) array. Requires bash 4.0+.                                                                     |
| `-r`   | read-only         | Makes the variable a constant; further assignment or `unset` fails. Cannot be removed with `+r`.                                      |
| `-x`   | export            | Exports the variable to the environment of child processes (same as `export`).                                                        |
| `-l`   | lowercase         | Converts assigned values to lowercase automatically. Requires bash 4.0+.                                                              |
| `-u`   | uppercase         | Converts assigned values to uppercase automatically. Requires bash 4.0+.                                                              |
| `-n`   | nameref           | Makes the variable a "name reference" to another variable, so operations act on the referenced variable. Requires bash 4.3+.          |
| `-t`   | trace             | Gives the variable (or function) the trace attribute; mainly meaningful for functions, which then inherit `DEBUG` and `RETURN` traps. |
| `-c`   | capitalize        | Capitalizes the first letter of assigned values (lowercases the rest). Requires bash 5.3+.                                            |

## Function-related and display options

| Option | Name           | Description                                                                           |
| ------ | -------------- | ------------------------------------------------------------------------------------- |
| `-f`   | functions      | Restricts the action to function names.                                               |
| `-F`   | function names | Displays function names (and source location with `extdebug`) without their bodies.   |
| `-g`   | global         | Creates variables at the global scope, even when used inside a function.              |
| `-p`   | print          | Displays the attributes and values of the named variables; with no names, prints all. |

## Quick examples

```bash
declare -i count=0          # integer
declare -r PI=3.14159       # read-only constant
declare -x API_URL="..."    # exported to child processes
declare -a list=(a b c)     # indexed array
declare -A map=([k]=v)      # associative array
declare -l tag="HELLO"      # stored as "hello"
declare -u code="abc"       # stored as "ABC"
declare -ir MAX=100         # integer AND read-only (combined)

ref=count
declare -n alias=ref        # nameref: alias now points at ref

declare -p count            # print attributes + value of count
declare +x API_URL          # remove the export attribute
```

## Notes

- Using `declare` inside a function makes the variable **local** by default; add `-g` to force global scope.
- The `-r` attribute is permanent for the life of the shell -> you cannot undo it with `+r`.
- Version requirements above reflect when each feature was introduced; `-c` is the newest (bash 5.3).
- `local` accepts the same option letters as `declare` when used inside functions.
