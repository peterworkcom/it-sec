# HTTP Host Header Attacks

## What is the Host header?

It's part of every web request. It tells the server **which website** you want.

Example: visiting portswigger.net sends `Host: portswigger.net`.

## Why does it matter?

Many websites now **share one IP address**. This happens in two main ways:

- **Virtual hosting**: one server runs several websites.
- **Intermediary routing**: a load balancer, reverse proxy, or CDN sits in front of many servers.

The Host header tells the system where to send each request.

> **Analogy:** An apartment building has one street address. The apartment number makes sure the mail reaches the right person. The Host header is like that apartment number.

## What is a Host header attack?

The user's browser sends the Host header, so **an attacker can change it**.

Problems happen when a website:

- trusts the header without checking it, or
- uses it to build things like links in emails.

This can lead to:

- Password reset poisoning
- Web cache poisoning
- Routing-based SSRF (reaching internal systems)
- Bypassing login checks
- Classic attacks like SQL injection

## Why do these flaws happen?

- Developers **wrongly assume** users can't change the header.
- Other headers (like `X-Forwarded-Host`) can **override** it, often switched on by default.
- Often the cause is **bad server configuration**, not bad code.

## How to prevent these attacks

1. **Avoid using the Host header** in server code. Use relative URLs where you can.
2. **Set your domain in a config file** if you need full (absolute) URLs.
3. **Check the header against an allowed list** of domains (Django's `ALLOWED_HOSTS` is one example).
4. **Turn off override headers** like `X-Forwarded-Host`.
5. **Limit where proxies forward traffic** to approved domains only.
6. **Keep internal sites separate** from public sites on different servers.

## Key takeaway

**Never trust the Host header.** Treat it like any other user input: check it, or don't use it.
