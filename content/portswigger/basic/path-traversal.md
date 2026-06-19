# path traversal

> Path traversal (also called directory traversal) is a web security vulnerability that lets an attacker read — and sometimes write — files on the server that they were never supposed to
> access, by manipulating file paths that the application builds from user input.

## The core idea

Many web apps take user input and use it to build a file path. For example, a page that serves images might do something like:

`https://example.com/download?file=report.pdf`

On the server, that might translate to:

`open("/var/www/files/" + user_input)`

The problem is the `../` sequence, which means "go up one directory." If the attacker sends:

`https://example.com/download?file=../../../../etc/passwd`

The resolved path becomes:

`/var/www/files/../../../../etc/passwd` -> `/etc/passwd`

and the server happily hands back a sensitive system file.

## Common targets

- `/etc/passwd`, `/etc/shadow` (Linux user/system info)
- Application config files (database credentials, API keys)
- Source code
- On Windows: `..\..\windows\win.ini`, SAM files, etc.

## Common evasion tricks attackers use

Naive filters that just strip `../` can often be bypassed:

| Technique                 | Example                                        |
| ------------------------- | ---------------------------------------------- |
| URL encoding              | `%2e%2e%2f` or `..%c0%af` or `..%252f` = `../` |
| Double encoding           | `%252e%252e%252f` or `..%ef%bc%8f` = `../`     |
| Mixed/backslash           | `..\/`, `....//` (strips to `../`)             |
| Absolute paths            | `/etc/passwd` directly                         |
| Null byte (older systems) | `file.pdf%00.png` or `/etc/passwd%00.png`      |
| Expected base folder      | `/var/www/images/../../../etc/passwd`          |

**null byte `%00`, more info [here](?file=portswigger/basic/null-byte)**

- `/var/www/images` just an example

## How to defend against it

- Avoid passing user input to the filesystem at all, use an indirect map (e.g., an ID that looks up a known filename) instead of letting users specify paths.
- Canonicalize and validate, resolve the full path, then verify it still sits inside the intended base directory:

```
import os
base = "/var/www/files"
full = os.path.realpath(os.path.join(base, user_input))
if not full.startswith(base + os.sep):
    raise Exception("Invalid path")
```

- Allowlist acceptable filenames/extensions rather than blocklisting bad patterns.
- Run with least privilege so the web process can't read sensitive system files even if traversal succeeds.
- Use framework-provided safe file APIs where available.
