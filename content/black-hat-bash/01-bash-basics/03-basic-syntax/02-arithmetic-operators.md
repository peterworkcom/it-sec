# arithmetic operators

> few way to conduct arithmetics in a bash script

- use `let` keyword before a variable
- use double parentheses `$((expression))`
- use `expr` command

examples:

```
let result1="4 * 5"
result=$((5 * 5))
result=$(expr 6 \* 5)

echo $result1
echo $result2
echo $result3
```

> **NOTE** `*` is a glob pattern so it needs an escape character before it `\*`

## escape wildcards

| Operator | Reason it breaks      | Safe usage              |
| -------- | --------------------- | ----------------------- |
| `*`      | Shell glob expansion  | `expr 6 \* 5`           |
| `( )`    | Shell subshell syntax | `expr \( 6 + 5 \) \* 2` |
| `\|`     | Shell pipe            | `expr 6 \\| 0`          |
| `&`      | Shell background job  | `expr 6 \& 5`           |
| `<`      | Shell input redirect  | `expr 6 \< 10`          |
| `>`      | Shell output redirect | `expr 6 \> 3`           |

## operators

| Operator | Description         | Example            | Result |
| -------- | ------------------- | ------------------ | ------ |
| `+`      | Addition            | `echo $((3 + 2))`  | `5`    |
| `-`      | Subtraction         | `echo $((5 - 3))`  | `2`    |
| `*`      | Multiplication      | `echo $((4 * 3))`  | `12`   |
| `/`      | Division (integer)  | `echo $((10 / 3))` | `3`    |
| `%`      | Modulus (remainder) | `echo $((10 % 3))` | `1`    |
| `**`     | Exponentiation      | `echo $((2 ** 8))` | `256`  |

## assignment operators

| Operator | Description         | Example      | Equivalent  |
| -------- | ------------------- | ------------ | ----------- |
| `=`      | Assign              | `((x = 5))`  | `x = 5`     |
| `+=`     | Add and assign      | `((x += 3))` | `x = x + 3` |
| `-=`     | Subtract and assign | `((x -= 3))` | `x = x - 3` |
| `*=`     | Multiply and assign | `((x *= 3))` | `x = x * 3` |
| `/=`     | Divide and assign   | `((x /= 3))` | `x = x / 3` |
| `%=`     | Modulus and assign  | `((x %= 3))` | `x = x % 3` |

## increment / decrement

| Operator | Description    | Example   | Effect              |
| -------- | -------------- | --------- | ------------------- |
| `++x`    | Pre-increment  | `((++x))` | Increment, then use |
| `x++`    | Post-increment | `((x++))` | Use, then increment |
| `--x`    | Pre-decrement  | `((--x))` | Decrement, then use |
| `x--`    | Post-decrement | `((x--))` | Use, then decrement |

## bitwise operators

| Operator | Description | Example            | Result |
| -------- | ----------- | ------------------ | ------ |
| `&`      | AND         | `echo $((6 & 3))`  | `2`    |
| `\|`     | OR          | `echo $((6 \| 3))` | `7`    |
| `^`      | XOR         | `echo $((6 ^ 3))`  | `5`    |
| `~`      | NOT         | `echo $((~6))`     | `-7`   |
| `<<`     | Left shift  | `echo $((1 << 3))` | `8`    |
| `>>`     | Right shift | `echo $((8 >> 2))` | `2`    |

## comparison operators (used in `(( ))` or `[ ]`)

| Operator | Description           | Example         |
| -------- | --------------------- | --------------- |
| `-eq`    | Equal                 | `[ $a -eq $b ]` |
| `-ne`    | Not equal             | `[ $a -ne $b ]` |
| `-lt`    | Less than             | `[ $a -lt $b ]` |
| `-le`    | Less than or equal    | `[ $a -le $b ]` |
| `-gt`    | Greater than          | `[ $a -gt $b ]` |
| `-ge`    | Greater than or equal | `[ $a -ge $b ]` |

## arithmetic contexts

| Syntax        | Description                              |
| ------------- | ---------------------------------------- |
| `$(( expr ))` | Arithmetic expansion (returns value)     |
| `(( expr ))`  | Arithmetic evaluation (for conditionals) |
| `let "expr"`  | Arithmetic with `let` builtin            |
| `expr 3 + 2`  | External `expr` command (older style)    |

> **Note:** Bash only supports integer arithmetic natively. For decimals, use `bc` or `awk`.
> Example: `echo "scale=2; 10 / 3" | bc` → `3.33`

> A few key things to remember:

- Always use $(( )) for arithmetic expansion in modern bash.
- Division is integer only — remainders are truncated.
- For floating point, pipe through bc or use awk.
