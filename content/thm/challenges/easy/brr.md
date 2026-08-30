# [brr](https://tryhackme.com/room/brr)

- check `nmap`

```bash
nmap -sV -sC <target-machine>
```

- it has a couple open ports, but the interesting to check

```
8080/tcp open  http    Apache Tomcat/Coyote JSP engine 1.1
```

- check in the browser the port `http://<target-machine>:8080`
- it will redirect to **ScadaBR**
- check online for default credentials for **ScadaBR**
- it is `admin:admin`
- after login, go to **Data Sources** (small icon)
- click **Edit** (small icon)
- **Modbus read data** -> **Register range** -> **Holding register**
- set **Number of registers** to 20
- click **Read data**

```
0 ==> 0054
...
19 ==> 0000
```

- copy the hex numbers until there are not 0 numbers (first 14)
- **hex** decode it

> What's the flag?

```
THM{modbus_hid}
```
