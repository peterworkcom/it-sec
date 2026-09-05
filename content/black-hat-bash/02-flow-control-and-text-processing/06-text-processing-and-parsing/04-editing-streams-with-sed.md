# editing streams with sed

> `sed` -> stream editor works on text

- replace text in file
- delete selected lines in file
- modify text in commands output

> output a file text, but change specific part of it

```bash
sed 's/Mozilla/Godzilla/g' log.txt
```

- this will print out the changed text but will not change the file
- `s` -> substitute (replace)
- **Mozilla** -> text to replace
- **Godzilla** -> text to replace to
- `g` -> global, not just the first occurrence but from the whole file

> save the output to a file

```bash
sed 's/Mozilla/Godzilla/g' log.txt > log2.txt
```

- `> log2.txt` -> `>` redirect the output to the `log2.txt`

> replacing whitespace with nothing

```bash
sed 's/ //g' log.txt > log2.txt
```

- `/ /` -> the ` ` (space) between the two `/` represent the whitespace
- `//` -> the nothing between the two `/` represent, well, the nothing

> delete the first line

```bash
sed '1d' log.txt > log2.txt
```

- `1d` -> `1` is the first line, `d` is the delete

> delete the last line

```bash
sed '$d' log.txt > log2.txt
```

- `$d` -> `$` is the last line, `d` is the delete

> delete multiple lines

```bash
sed '2,4d' log.txt > log2.txt
```

- `2,4d` from 2 to 4 the lines are dropped (deleted)

> print specific lines

```bash
sed -n '2,4 p' log.txt > log2.txt
```

- `-n` -> only prints the result otherwise it would print the whole content plus the results
- `2,4 p` -> `p` prints from line 2 to 4, can have space between the `4` or the `p` or not

> make the changes in the actual file

```bash
sed -i '1d' log2.txt
```

- `-i` -> will make the changes in the actual file
