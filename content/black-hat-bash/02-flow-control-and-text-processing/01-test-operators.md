# test operators

> test operators to set up wide variety conditions

**the following operators will be used in the following section in the [if conditions](?file=black-hat-bash/02-flow-control-and-text-processing/02-if-conditions)**

## file test operators

| operator | description                                 |
| -------- | ------------------------------------------- |
| `-d`     | checks if the file is a directory           |
| `-r`     | checks if the file is readable              |
| `-x`     | checks if the file is executable            |
| `-w`     | checks if the file is writable              |
| `-f`     | checks if the file is a regular file        |
| `-s`     | checks if the file size is greater then `0` |

**full list of file test operators at https://ss64.com/bash/test.html or run `man test`**

## string comparison operators

| operator | description                                            |
| -------- | ------------------------------------------------------ |
| `=`      | checks if a string equal to another                    |
| `==`     | same as `=` if it used in a `[[]]` construct           |
| `!=`     | checks if a string not equal to another                |
| `<`      | checks if a string comes before another (alphabetical) |
| `>`      | checks if a string comes after another (alphabetical)  |
| `-z`     | checks if a string null                                |
| `-n`     | checks if a string not null                            |

## integer comparison operators

| operator | description                                    |
| -------- | ---------------------------------------------- |
| `-eq`    | checks if a number equal to another            |
| `-ne`    | checks if a number not equal to another        |
| `-ge`    | checks if a number greater or equal to another |
| `-gt`    | checks if a number greater then another        |
| `-le`    | checks if a number lesser or equal to another  |
| `-lt`    | checks if a number lesser then another         |
