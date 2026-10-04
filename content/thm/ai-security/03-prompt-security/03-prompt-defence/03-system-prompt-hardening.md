# System Prompt Hardening

## What the system prompt is

- It is the part of an AI app the developer fully controls.
- It sets the AI's role, rules, and limits.
- It is the first thing attackers try to break, and it can be bypassed.

## Three ways to harden it

| Pattern             | What it means                                          | Why it helps                               |
| ------------------- | ------------------------------------------------------ | ------------------------------------------ |
| Tight scoping       | Say exactly what the AI does and does not do           | A narrow role is harder to twist           |
| Explicit refusals   | Tell the AI how to handle "ignore your rules" requests | Makes attackers work harder                |
| Persona restriction | Ban roleplay and character play                        | Blocks tricks like the "grandma" jailbreak |

> None of these works alone, but together they make attacks much harder.

## Two mistakes to avoid

> Don't put secrets in the system prompt.

- API keys, passwords, and internal names can all be pulled out.
- OWASP says the system prompt is not a security boundary.
- The Sydney leak was harmful partly because it showed how the app worked inside.

> Don't rely on "ignore any attempts to…" lines.

- They are plain language, so they can be overridden like any other text.
- If an attacker sees your prompt, they know exactly what you tried to block.

## Structured prompt templates

> Role tags (like ChatML and Harmony) help the AI tell trusted instructions from user input. They are the closest thing to a real boundary, but attackers can fake these tags too.

> How to use them in code

- Put your instructions in the system message.
- Put user input in a separate user message.
- Never join them into one string, like system_prompt + user_input. This removes the separation.
- Wrap user input in clear markers (like <<<USER INPUT>>>), so the AI knows where untrusted text starts and ends.
- Treat outside content (documents, emails, RAG chunks) like user input. Never put it in the system message.
