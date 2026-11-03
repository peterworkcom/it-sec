# importing custom scripts

- you can separate, make a different file for the aliases, functions, then source that file in the `.bashrc`

> `file.sh`:

```sh
duck() {
    echo "quack"
}
```

> in the `~/.bashrc`:

```sh
source ~/path-to-file/file.sh
```

or

```sh
. ~/path-to-file/file.sh
```

- same result

> then open a new terminal or `source` the `.bashrc`

```sh
duck
```
