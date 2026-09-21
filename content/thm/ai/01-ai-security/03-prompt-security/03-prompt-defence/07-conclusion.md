# conclusion

- LLM security is probabilistic, not binary. Attacks succeed by shifting probability distributions, which means defences must be layered rather than absolute.
- A hardened system prompt is the first line of defence, using tight scoping, explicit refusal instructions, and structural separation from user input, but it cannot stand alone.
- Guardrails filter malicious inputs before they reach the model and catch dangerous outputs before they leave, but can be bypassed through obfuscation and indirect injection.
- Deployment controls limit what a compromised model can actually do, applying least privilege to tool access, data retrieval, and permissions to shrink the blast radius of a successful attack.
- Rate limiting, logging, and monitoring ensure that when attacks slip through, they are detected, investigated, and used to strengthen future defences.
