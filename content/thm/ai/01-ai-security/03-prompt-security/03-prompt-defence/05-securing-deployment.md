# securing deployment

> Some attacks will always get past your defences. So the key question is: **when an attack gets through, how much damage can it do?**

- Good deployment controls keep that damage small.

## 1. Principle of least privilege

- Give the AI **only the access it needs** for its job. Nothing more.
- If an attack succeeds, the AI can only leak what it can reach.
- **Example:** The Slack AI attack worked because the AI could read private channels the attacker couldn't. With tighter access, the attack would have found nothing useful.
- **For RAG systems:** only fetch documents the current user is allowed to see.
- The line between "instructions" and "data" should be enforced in the system's design, not just in the prompt.

> every permission you don't give is one an attacker can't use.

## 2. Improper output handling (OWASP LLM05:2025)

- AI output often goes somewhere else: a browser, a database, or code that runs it.
- If that output isn't cleaned first, an attacker can trick the AI into writing harmful code that your own systems then run.
- This leads to classic attacks:
  - JavaScript shown in a browser -> **XSS**
  - Unsafe SQL queries -> **SQL injection**
  - Output sent to shell commands -> **remote code execution**

> treat AI output like untrusted user input. Check it, clean it, encode it, and enforce strict formats.

## 3. Rate limiting, logging, and monitoring

> These don't stop attacks. They help you **notice** them.

- **Rate limiting:** slows attackers down and flags repeated attempts.
- **Logging:** keeps a record so you can work out what happened.
- **Monitoring:** spots odd behaviour, like unusually large outputs or signs of data theft.

> Limit what the AI can access, check what it outputs, and watch for anything unusual.
