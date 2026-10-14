# Web Cache Poisoning

## What is it?

Web cache poisoning is an attack. The attacker tricks a website's cache into saving a harmful response. Then the cache gives that harmful response to other people.

## What is a cache?

A cache is a helper that sits between users and the server.

- It saves copies of responses.
- When someone asks for the same thing, the cache sends the saved copy.
- This makes the website faster and keeps the server from being overloaded.

## How does the cache know two requests are the same?

It uses a **cache key**. This is a small set of details from the request, usually the request line and the Host header.

- Parts of the request that are in the key are **keyed**.
- Parts that are not in the key are **unkeyed**.
- The cache ignores unkeyed parts completely.

Attackers use these ignored parts to sneak in harmful content.

## How bad can it be?

It depends on two things:

1. **What the attacker gets cached.** A more harmful payload does more damage.
2. **How popular the page is.** A poisoned home page could reach thousands of people.

An attacker can also use a script to re-poison the cache again and again.

## How the attack works

There are three steps:

1. **Find unkeyed inputs.** These are often headers. You can test by adding random inputs and watching for changes in the response. The Burp tool **Param Miner** can do this automatically.
2. **Get a harmful response from the server.** This works if the server puts the input into its response without cleaning it.
3. **Get that response cached.** This can be tricky. It can depend on the file type, status code, and response headers.

## A safety warning for testers

When testing a live website, you might poison the cache for real users by accident. To avoid this, add a **cache buster**. This is a unique value, such as a random parameter, that makes your request unique. Param Miner can add one automatically.

## How to prevent it

- **Turn off caching** if you don't really need it. Some sites only cache because a CDN turned it on by default.
- **Cache only static content**, and be careful about what counts as "static".
- **Turn off unneeded headers.** If the site doesn't need a header, disable it.
- **Check third-party tools.** You are only as secure as your weakest part.
- **Rewrite the request** instead of removing something from the cache key for speed.
- **Don't accept fat GET requests.** These are GET requests with a body.
- **Patch client-side bugs**, even if they look impossible to exploit. A cache quirk might make them exploitable later.
