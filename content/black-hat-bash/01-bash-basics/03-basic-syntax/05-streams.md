# streams

> streams are files that act as communication channels between programs and its environment

## The three streams

Every process starts with three open file descriptors (FDs):

| FD  | Name   | Default  | Purpose                |
| --- | ------ | -------- | ---------------------- |
| `0` | stdin  | keyboard | input into the program |
| `1` | stdout | terminal | normal output          |
| `2` | stderr | terminal | errors & diagnostics   |

> stdin - standard input stream
> stdout - standard output stream
> stderr - standard error stream

## operators

> stdin - `>` is shorthand for `1>` - append `>>` is shorthand for `1>>`
> stdout - `2>` - append `2>>`
> stderr - `<` - no append

- Normal results go to `stdout` so you can pipe or save them, while errors go to `stderr` so they still show up even when you've redirected stdout elsewhere.

## basics

```
command > out.txt      # stdout to file (overwrite)
command >> out.txt     # stdout to file (append)

command 2> err.txt     # stderr to file (overwrite)
command 2>> err.txt    # stderr to file (append)

command < in.txt       # stdin from file
```

## combining and separating

```
command > out.txt 2> err.txt     # separate files
command > all.txt 2>&1           # both into one file
command 2>&1 | less              # send both down a pipe
command &> all.txt               # bash shortcut for "both to file"
```

#### separate files

```
command > out.txt 2> err.txt
```

```bash
mkdir -v dir1 dir2 dir1 > out.txt 2> err.txt
```

- `> out.txt` -> send stdout to out.txt
- `2> err.txt` -> send stderr to err.txt
- the two streams go to different files

#### both into one file

```
command > all.txt 2>&1
```

```bash
mkdir -v dir1 dir2 dir1 > all.txt 2>&1
```

> read it left to right:

1. `> all.txt` -> `stdout` now points at `all.txt`
2. `2>&1` -> `stderr` point wherever `stdout` currently points, which is `all.txt`

- so both streams end up in `all.txt`

> **note** Order matters, `command 2>&1 > all.txt` -> wrong for both into one file

- in this case `2>&1` runs first, `stdout` still points at the terminal, so `stderr` goes to the terminal too, then `stdout` moves to the file, they end up in different places
- the rule redirect `stdout` first, then point `stderr` at it

> shortcut

```
command &> all.txt
```

```bash
mkdir -v dir1 dir2 dir1 &> all.txt
```

- means exactly the same as `> all.txt 2>&1`

#### send both down a pipe

> errors not counted

```bash
mkdir -v dir1 dir2 dir1 | wc -l
```

vs

> errors counted

```bash
mkdir -v dir1 dir2 dir1 2>&1 | wc -l
```

- pipe `|` only carries `stdout` by default, `stderr` would still spill onto your terminal
- `2>&1` merges `stderr` into `stdout` before the pipe, so `wc` receives both
- whatever FD 1 (`stdout`) points to right now, make FD 2 (`stderr`) point to the same place

> shortcut

```bash
mkdir -v dir1 dir2 dir1 &| wc -l
```

- `&|` bash shorthand for `2>&1 |`

## Discarding output

```
command > /dev/null        # toss stdout

command 2> /dev/null       # toss stderr (silence errors)

command > /dev/null 2>&1   # toss everything
command &> /dev/null       # toss everything
```
