# HTTP Request Smuggling Detection Table

## Test 1 - Top message (CL = 6, no zero chunk)

```
Content-Length: 6
Transfer-Encoding: chunked

3
abc
X
```

| Server response        | What it means                                              | Type              |
| ---------------------- | ---------------------------------------------------------- | ----------------- |
| **response** (backend) | Back-end read by **weight (CL)**, finished cleanly         | **CL.CL**         |
| **reject** (frontend)  | Front-end read **chunks (TE)**, saw it was broken, refused | **TE.CL / TE.TE** |
| **timeout** (backend)  | Back-end read **chunks (TE)**, still waiting for more      | **CL.TE** (!)     |

## Test 2 - Bottom message (CL = 6, has zero chunk + X)

```
Content-Length: 6
Transfer-Encoding: chunked

0

X
```

| Server response             | What it means                                              | Type              |
| --------------------------- | ---------------------------------------------------------- | ----------------- |
| **response** (backend)      | Back-end finished cleanly                                  | **CL.CL / TE.TE** |
| **timeout** (backend)       | Back-end used **weight (CL)**, waits for a missing byte    | **TE.CL**         |
| **socket poison** (backend) | Back-end ended early; **`X` left stuck** on the connection | **CL.TE** (!)     |

## Combined view - what each result points to

| Signal you see           | Test 1 says    | Test 2 says    |
| ------------------------ | -------------- | -------------- |
| **Normal response**      | CL.CL          | CL.CL or TE.TE |
| **Rejected by frontend** | TE.CL or TE.TE | -              |
| **Backend timeout**      | CL.TE (!)      | TE.CL          |
| **Socket poison**        | -              | CL.TE (!)      |

## Quick meaning of each signal

| Signal            | Plain meaning                            | Mailroom                         |
| ----------------- | ---------------------------------------- | -------------------------------- |
| **response**      | Both servers **agreed**                  | Parcel passed clean              |
| **reject**        | A server **caught** the bad request      | Worker sent it back              |
| **timeout**       | A server is **still waiting**            | Worker waits for a missing piece |
| **socket poison** | A **leftover** stuck to the next request | Leftover glued to next parcel    |

## Key idea

> **(!) CL.TE is the dangerous one.** It shows up as a **timeout** in Test 1 and as **socket poison** in Test 2.

---

# HTTP Request Smuggling — Confirm Table

## CL.TE confirm message

```
Content-Length: 6
Transfer-Encoding: chunked

0

X
```

| Server        | Reads by        | What it sees               | Stops where         |
| ------------- | --------------- | -------------------------- | ------------------- |
| **Front-end** | Weight (CL = 6) | 6 bytes: `0 \r \n \r \n X` | Forwards it **all** |
| **Back-end**  | Chunks (TE)     | `0` = "THE END"            | Stops **early**     |

**Leftover:** `X` -> sticks to the next request (!)

## TE.CL confirm message

```
Content-Length: 3
Transfer-Encoding: chunked

1
X
0

```

| Server        | Reads by        | What it sees              | Stops where         |
| ------------- | --------------- | ------------------------- | ------------------- |
| **Front-end** | Chunks (TE)     | chunk `X`, then `0` = end | Forwards it **all** |
| **Back-end**  | Weight (CL = 3) | 3 bytes: `1 \r \n`        | Stops **early**     |

**Leftover:** `X\r\n0\r\n\r\n` -> sticks to the next request (!)

## Side-by-side comparison

| Feature               | **CL.TE**           | **TE.CL**         |
| --------------------- | ------------------- | ----------------- |
| Content-Length set to | **6** (covers all)  | **3** (too small) |
| "THE END" note (`0`)  | **Early**, near top | **At the end**    |
| Front-end reads by    | Weight (CL)         | Chunks (TE)       |
| Back-end reads by     | Chunks (TE)         | Weight (CL)       |
| Who stops early       | **Back-end**        | **Back-end**      |
| What leaks            | `X`                 | `X\r\n0\r\n\r\n`  |

## Detect vs Confirm

| Step        | Purpose                                                               |
| ----------- | --------------------------------------------------------------------- |
| **Detect**  | Narrows down the **likely** type (timeouts, signals)                  |
| **Confirm** | **Proves** the exact type by making the leftover **actually smuggle** |

## Key idea

> Both messages **force the back-end to stop early**. **Which** message leaks tells you **which type** you have.
