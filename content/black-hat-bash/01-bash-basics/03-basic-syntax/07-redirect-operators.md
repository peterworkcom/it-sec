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

# `<` -> **file** to `stdin`

```bash
echo "rock n roll" > read.txt
cat < read.txt
```

- `<` feeds the `read.txt` to the `cat` command
