# shortening commands with aliases

> you can create a custom name for commands

```bash
alias quickmap="nmap -vv -T4 -p- -sV --max-retries 5 localhost"
```

- this custom name called **alias**
- then just run the command with `quickmap`

```bash
quickmap
```

> can assign **alias** to scripts too

```bash
alias helloworld="bash ~/scripts/helloworld.sh"
```

> these are not permanent, but adding them to `.bashrc` can make them (next section)
