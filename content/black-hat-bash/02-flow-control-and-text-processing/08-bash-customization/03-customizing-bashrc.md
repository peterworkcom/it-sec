# customizing ~/.bashrc

> the `~/.bashrc` file can be used to load variables and functions

- just add the append them to the end of the `~/.bashrc` file like the following

```sh
VULN_HOST=1.0.0.22
VULN_ROUTER=10.0.0.254

alias quicknmap="nmap -vv -T4 -p- -sV --max-retries 5 localhost"
```

- the new entries will be available in a new terminal or the `~/.bashrc` can be read by the `source` command

```bash
source ~/.bashrc

echo ${VULN_HOST}
# 10.0.0.22

echo ${VULN_ROUTER}
# 10.0.0.254
```

- this way aliases and variable will "stay" after the terminal restarted
