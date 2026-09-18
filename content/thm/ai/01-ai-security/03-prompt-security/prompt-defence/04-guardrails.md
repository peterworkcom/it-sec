# guardrails

> Guardrails are the **layer after** a hardened system prompt. They check input before it reaches the model, and check output after. Neither layer replaces the other.

## Why simple filters fail

> **Blocklists** match strings or patterns like "ignore previous instructions."

- Cheap and fast
- Catch only lazy attacks
- Easy to dodge with Base64, leetspeak, homoglyphs, zero-width characters or emoji smuggling

> The core problem, the attacker and the model share a language the filter doesn't understand.

## Classifiers do better, but aren't safe

> **Llama Prompt Guard 2** is a BERT-based classifier (86M and 22M versions) that judges **intent** rather than exact wording. So it can catch attacks it has never seen.

> But it also breaks:

- Add 30% character-level noise, and **98.2%** of malicious prompts get labelled benign
- Meta's own docs admit adversaries can target the classifier directly

## Two places guardrails sit

> **Input guardrails**: run before generation.

- Block malicious instructions, strip PII, reject off-topic requests. Nothing is generated, so cost stays low.

> **Output guardrails**: run after generation.

- Catch leaked credentials or PII, policy violations, malformed tool calls. Regex scrubbing and schema validation live here.

> Most production systems need both.

## The big gap: indirect injection

> Retrieved content, a document, an email, a RAG chunk, arrives **after** the input guardrail has already run. The model treats it as context, not as a flagged input.

- That is how the **2024 Slack AI vulnerability** worked. Hidden instructions in uploaded files made Slack AI leak private channel content.

- Fix: treat all retrieved content as untrusted and run checks on RAG chunks too.

## Trade-offs

| Check type        | Latency             | Coverage            |
| ----------------- | ------------------- | ------------------- |
| Regex / blocklist | microseconds        | known patterns only |
| Neural classifier | tens–hundreds of ms | semantic intent     |
| LLM-as-judge      | seconds             | accurate, slow      |

- Above **200ms** the user experience suffers, so the practical pattern is a **cascade**: cheap checks first, heavy ones only on what survives.

- Over-tuning hurts too. Sensitive configurations kept flagging legitimate queries, especially code review prompts. A guardrail that blocks real users has failed.

## Takeaway

No single guardrail design wins across all attack types. Use them as one layer, not the whole defence.
