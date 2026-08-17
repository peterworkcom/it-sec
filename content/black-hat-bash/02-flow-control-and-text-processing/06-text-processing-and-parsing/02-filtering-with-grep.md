# filtering with grep

> `grep` can be used to filter the streams for information

```bash
grep '35.237.4.214' log.txt
```

should return something like this:

```
35.237.4.214 - - [19/Dec/2020:15:22:40 +0100] "GET /administrator/%22 HTTP/1.1" 404 226 "-" "Mozilla/5.0 (compatible; Discordbot/2.0; +https://discordapp.com)" "-"
```
