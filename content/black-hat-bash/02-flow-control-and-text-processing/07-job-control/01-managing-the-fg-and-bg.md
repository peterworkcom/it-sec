# managing the foreground and background

> try the following:

```bash
sleep 10 && echo "waited 10 sec"
```

- then this:

```bash
sleep 10 & echo "instant"
```

- in the first one the `&&` strings the commands after another waiting to the commands to finnish
- but in the `&` version the `sleep 10` is backgrounded so `echo` is not blocked for 10 sec
- the `sleep 10` still runs but it do not blocks the terminal

> put the `sleep` for 60 sec in the background

```bash
sleep 60 &
```

- then do the following command:

```bash
ps -ef | grep sleep
```

- this will show the `sleep` command(s) in the background
- `ps` means **process status** -> it lists the programs (processes) running on your computer
- there are two options joined together:
- `-e` means **every** process, from all users, not just yours
- `-f` means **full** format, which shows more detail for each process
- the **pipe** `|`, it takes the output from the left command and sends it into the right
- `grep sleep` searches text that contain the word `sleep`

> any command started in the same terminal and backgrounded can be shown with the command "jobs"

```bash
jobs
```

> if you background a command you can foreground it but you need to id it to know which one because more can be backgrounded at once

- try the following

```bash
sleep 70 &
sleep 60 &
jobs
fg %1
```

- with `fg` you can foreground a command and the `%1` points to the id 1

> if there is a command occupying the terminal, it can be paused with the `ctrl+z`

- with `fg %1` (1 is the id for the command) it can be continued
- with `bg %1` (1 is the id for the command) it can be backgrounded and continued
