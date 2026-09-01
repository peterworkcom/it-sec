# Web Cache Deception (WCD)

## What it is:

A security flaw where an attacker tricks a shared cache (like a CDN) into storing private, dynamic data, then accesses that data themselves.

## Why it happens:

The cache and the origin server read URLs differently. The cache thinks a URL is a static file (like .css or .js). The server thinks it's a request for private data. That mismatch causes leaks.

## Simple attack flow:

- Attacker sends victim a tricky URL (e.g. /static/../user/123)
- Victim's browser loads it, server returns their private data
- Shared cache mistakes it for a static file -> saves a copy
- Attacker requests the same URL -> gets the victim's cached data

## Key point:

Only works with shared caches (CDN, reverse proxy), not personal browser cache, since attackers can't access another device.

## Not the same as:

Cache poisoning (injecting bad content for others to see), WCD is about stealing private content, not injecting fake content.

## Delimiter Discrepancies

> A delimiter is a character that marks where parts of a URL split (for example, `?`). Frameworks don't all agree on which characters count as delimiters.

When the cache and the origin server disagree, they read the same URL as two different paths. An attacker can abuse this gap to trick the cache into storing private data.

> How the attack works

- The origin server sees a delimiter and returns private, dynamic data.
- The cache does not see the delimiter, so it reads a static extension (like .js or .css).
- The cache stores that private data and serves it to other users.

> Common inconsistent delimiters

- `;` -> used by Java Spring, ignored by most others
- `.` -> used by Ruby on Rails to set response format
- `%00` -> used by OpenLiteSpeed; read as path by Akamai and Fastly

> How to test for it

- Add a random string to the URL -> `/list` becomes `/listaaa` (this is your reference).
- Insert a possible delimiter -> `/list;aaa`. If it matches `/list`, the origin server treats `;` as a delimiter.
- Add a static extension -> `/list;aaa.js`. If the response gets cached, the cache did not treat `;` as a delimiter.
- Final payload example: `/settings/users/list;aaa.js`

> Important limitation

Browsers encode some characters (`{`, `}`, `<`, `>`) and cut the path at #, so those can't be used directly. An encoded version may still work if the cache or server decodes it.

> good options for [delimiter](/?file=portswigger/web-cache-deception/delimiters)
