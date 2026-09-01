# filtering with awk

> `awk` can be used to identify and return fields from a file

```bash
awk '{print $1}' log.txt
```

- this will print out the first field from every line
- the `print` means "show this"
- the `$1` means "the first field".
