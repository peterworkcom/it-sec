# PATH

> When a script runs a command like `ps`, Linux doesn't know where `ps` lives.

- So it searches a list of folders (called the **PATH**) and runs the first `ps` it finds.

## The trick

> If you can sneak a fake `ps` into a folder that gets searched first, then your fake runs instead of the real one.

- With `echo $PATH` can check the user's **PATH**
- Would look something like this:

```bash
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin
```

- What translates to:

```
/usr/local/sbin
/usr/local/bin
/usr/sbin
/usr/bin
/sbin
/bin
/usr/games
/usr/local/games
/snap/bin
```

- The first place it finds the `ps` will be run

## pre check

> `which -a ps` shows all copies of `ps` in run order

## temporary modify PATH

> Add a folder to the FRONT (highest priority):

```bash
export PATH=/opt/dev/bin:$PATH
```

> Add to the END (lowest priority):

```bash
export PATH=$PATH:/opt/dev/bin
```

> to reorder have to rewrite it
