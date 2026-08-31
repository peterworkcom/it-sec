# [fools mate](https://tryhackme.com/room/foolsmate)

- start both attack and target machine
- in the attack machine open burp
- open burp browser
- paster the target machine url
- on the site try to win the game
- you will get an error that the machine will "shut down" if you make that move
- make another move
- reset the game
- go to the burp history
- check the successful move `POST` request `/api/move`
- should be something like:

```
POST /api/move HTTP/1.1
...
{"from":"a1","to":"a7"}
```

- send it to the repeater
- change it to something like this

```
POST /api/move HTTP/1.1
...
{"from":"a1","to":"a8"}
```

- send it
- in the response there will be the flag

> What is the flag?

```
THM{cl13nt_s1d3_ch3ckm4t3}
```
