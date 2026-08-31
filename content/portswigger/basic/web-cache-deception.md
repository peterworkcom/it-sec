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
