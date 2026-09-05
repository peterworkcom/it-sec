# [Room 404](https://tryhackme.com/room/hh-room404-804573bf)

- start up the Attacker machine and the Target machine
- get the target site: `http://<target-machine-ip>:8080`

> `nmap` on the target machine

- create an `nmap` folder

```
mkdir nmap
```

---

```bash
nmap -sV -sC -oN nmap/initial <target-machine-ip>
```

`nmap` -> network scanner tool

`-sV` -> Version detection, finds what software is running on each open port

`-sC` -> Runs default scripts, these are safe, built-in checks, they grab extra info

`-oN nmap/initial` -> Saves the output to a file called `initial` what is in the `nmap` folder (the folder needs to be exist)

`-oN` -> normal output format (readable text)

---

- it will expose a `/.git/` path

> lets check for other paths

---

```bash
gobuster dir -u "http://<target-machine-ip>:8080" -w /usr/share/wordlists/SecLists/Discovery/Web-Content/common.txt -r
```

`gobuster dir` -> Runs gobuster in directory mode, tries lots of folder/file names against the site

`-u "http://<target-machine-ip>:8080"` -> The target URL

`-w /usr/share/wordlists/SecLists/Discovery/Web-Content/common.txt` -> The wordlist, this file has thousands of common folder/file names like /admin, /backup, /login, /uploads etc...

`-r` ->Follow redirects, if a URL redirects (like /admin -> /admin/), gobuster follows it

---

- no new paths

> lets download the `.git` folder and checkout it

- create a `temp` folder

```
mkdir temp
```

---

```bash
wget --mirror --no-parent -P temp/ http://<target-machine-ip>:8080/.git/
```

`wget` -> A tool for downloading files from the web

`--mirror` -> Downloads recursively, keeps going until it's copied the whole folder structure

`--no-parent` -> Stay inside the target folder, stops wget from wandering "up" to parent directories

`-P gitfolder/` -> save everything into `gitfolder/`, creates it if it doesn't exist

`http://<target-machine-ip>:8080/.git/` -> The target

---

- check out the .git folder (create its content)

```bash
cd temp/<target-machine-ip>:8080
git checkout .
```

- list the new content

```bash
ls -la
```

- there should be a `README.md` file
- check it

```bash
cat README.md
```

> What is the flag?

```
THM{byt3_l0tus_n3v3r_f0rg3ts}
```
