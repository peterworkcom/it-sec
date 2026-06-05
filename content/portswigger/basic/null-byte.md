# null byte

- null byte is the character with the numeric value zero
- written as `\0`, `0x00`, or in URLs as `%00`
- it's the "end of string" marker in low-level languages like C
- the "end of string" marker what makes it dangerous in older web applications

> the idea is even if `../../etc/passwd` becomes `../../etc/passwd.png`, that won't exist, so it is ok

> but the attacker sends `?file=../../etc/passwd%00.png`

- `%00` converted to `\0`
- the web app (high-level) sees: `../../etc/passwd\0.png`
- the length looks fine, ends in `.png`, passes the check
- the OS file call (C, low-level) sees the `\0`
- stops reading at `\0`, and it opens ../../etc/passwd
