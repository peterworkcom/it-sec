# indirect prompt injection

## What Is Indirect Prompt Injection?

> Direct injection -> attacker types bad commands straight into the chat.

> Indirect injection -> attacker hides bad commands somewhere else, like:

- A webpage
- An email
- A document
- A tool's output

> Then the AI reads that hidden text later. It follows the hidden commands. The user never typed anything harmful.

## Where It Hides

> **Web pages**: Hidden text on a site (like invisible font).

- Example: Bing Chat was tricked into acting like a "pirate scammer" just by visiting a bad webpage.

> **Emails & documents**: Invisible text (white-on-white) with secret commands.

- Example: "EchoLeak" attack. One email tricked Microsoft Copilot into leaking private files. No clicks needed.

> **AI coding tools**: Hidden text in a shared file or README.

- Example: A booby-trapped Google Doc took over the Cursor AI coding tool. It ran harmful code automatically.

> **RAG systems**: Another target (covered in a separate module).

## Why It's Dangerous

- **Unwanted actions**: AI does things the user didn't ask for
- **Data leaks**: Private info gets sent out
- **Bad advice**: Trusted AI gives scam links or false info
- **Zero-click attacks**: Just opening a file can trigger it

## The Core Problem

AI often treats all text as instructions, even text it wasn't supposed to trust. Mixing trusted and untrusted text is risky. That's why this is seen as one of AI's biggest security weak spots.
