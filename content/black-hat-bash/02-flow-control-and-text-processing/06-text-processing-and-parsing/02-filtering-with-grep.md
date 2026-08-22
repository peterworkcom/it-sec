# filtering with grep

> `grep` can be used to filter the streams for information

---

```bash
grep '35.237.4.214' log.txt
```

should return something like this:

```
35.237.4.214 - - [19/Dec/2020:15:22:40 +0100] "GET /administrator/%22 HTTP/1.1" 404 226 "-" "Mozilla/5.0 (compatible; Discordbot/2.0; +https://discordapp.com)" "-"
```

---

> you can use `\|` as **OR** in a string or with `-e` front of the separated strings

```bash
grep "35.237.4.214\|13.66.139.0" log.txt
```

```bash
grep -e "35.237.4.214" -e "13.66.139.0" log.txt
```

---

> filter a command result with `command | grep "filter-for"`

```bash
ps | grep TTY
```

- make it not case sensitive with `-i`

```bash
ps | grep -i tty
```

---

> exclude a specific content with `-v`

```bash
grep -v "35.237.4.214" log.txt
```

- this will return everything except the line with **"35.237.4.214"**

---

> return only the searched element, not the whole line

```bash
grep -o "35.237.4.214" log.txt
```

---

> supports

- regular expressions
- anchoring
- group-ing
- ...
