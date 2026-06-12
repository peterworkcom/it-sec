# redirect operators

| operator     | descriptions                                   |
| ------------ | ---------------------------------------------- |
| `>`          | `stdout` to **file**                           |
| `>>`         | append `stdout` to **file**'s end              |
| `&>` or `>&` | `stdout` and `stderr` to **file**              |
| `&>>`        | append `stdout` and `stderr` to **file**'s end |
| `<`          | **file** to `stdin`                            |
| `<<`         | block of text to `stdin`                       |
| `\|`         | `stdout` to `stdin`                            |

## `>` -> `stdout` to **file**

```bash
ls -la > ls.txt
```

- redirect the bash output to the ls.txt file

## `>>` -> append `stdout` to **file**'s end

```bash
echo "first line" > echo.txt
echo "first line again" > echo.txt
echo "second line" >> echo.txt
```

- the `>` will overwrite the file content but the `>>` will append the text to the end of the file content

## `&>` or `>&` -> `stdout` and `stderr` to **file**

```bash
mkdir -v dir dirToo dir &> log.txt
```

- `&>` or `>&` will redirect the output and the error to the `log.txt`

## `&>>` -> append `stdout` and `stderr` to **file**'s end

```bash
mkdir -v dir1 dir2 dir1 &> log.txt
mkdir -v dir2 dir3 &> log.txt
mkdir -v dir3 dir4 &>> log.txt
```

- the first two line will create new content for the `log.txt` while the third will append the content to the end of the file

## `<` -> **file** to `stdin`

```bash
echo "cat likes fish" > catFood.txt
cat < catFood.txt
```

- `<` feeds the `cat` with `catFood.txt`

## `<<` -> block of text to `stdin`

```bash
cat << EOF
go go go
rock n roll
EOF
```

- it fill feed the `cat` with the text from `EOF` to `EOF`
- the `EOF` can be any text, `MORE`, `duck`, just have to match
- after the `cat << EOF` you can use `Enter` to go to the next line

## `\|` -> `stdout` to `stdin`

- translates `stdout` to `stdin`

```bash
ls | wc -l

# number of lines
```

- `ls` lists the files in the current directory
- `|` passes that list to the next command
- `wc -l` counts the number of lines
- `#` the number of lines
