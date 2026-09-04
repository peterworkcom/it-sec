# filtering with awk

> `awk` can be used to identify and return fields from a file

```bash
awk '{print $1}' log.txt
```

- this will print out the first field from every line
- the `print` means "show this"
- the `$1` means "the first field".

> print multiple fields, first 3 of every line

```bash
awk '{print $1,$2,$3}' log.txt
```

> print the first and the last field of every line

```bash
awk '{print $1,$NF}' log.txt
```

- `NF` represents the last line

> print by a different separator

```bash
awk -F'.' '{print $1}' log.txt
```

- with `-F'.'` the default separator ` ` (space) was changed to `.` (dot), so `awk` splits a line to fields by the `.`
- try `awk -F'.' '{print $4}' log.txt` :D

> print selected number of **lines**

```bash
awk 'NR < 5' log.txt
```

- this will print the first 4 **lines**
- `NR` represents the total number of records

## keys

| key | meaning                      |
| --- | ---------------------------- |
| $1  | first field                  |
| $0  | the whole line               |
| NR  | line number                  |
| NF  | how many fields on this line |
| $NF | the last field               |

## mix with grep

```bash
grep "42.236.10.117" log.txt | awk '{print $7}'
```

- will print every 7th field of every line that has `42.236.10.117`
