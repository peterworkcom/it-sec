# keep jobs running after logout

> running commands even if they backgrounded will not survive if the terminal closed or the user log out

- if you close the terminal the process will receive a `SIGHUP` and terminate

> to keep a process alive you can use `nohup` (no hangup) command

```bash
nohup ./some-script.sh &
```

- this will create a file `nohup.out` with standard output stream data

> can run background scripts with `systemd` too
