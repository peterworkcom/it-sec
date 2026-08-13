# good to know

## Prevent Prompt Injection Attack

> Prompt

- This is where user input is incorporated into the system instructions. If not controlled, malicious instructions can override intended behavior.

> LLM

- The model executes the final prompt. If it receives manipulated instructions, it may follow them and expose sensitive data or misuse tools.

## Prevent Data Leakage Attack

> LLM

- The model decides what to include in the response. Without safeguards, it may surface sensitive retrieved data.

> Retrieval

- This component fetches contextual data. If filtering is weak, it may return sensitive information.

> Database

- Stores embeddings or records that may contain confidential data. If exposed indirectly, it becomes a source of leakage.

## Prevent Data Poisoning Attack

> Retrieval

- If poisoned data is stored and later retrieved, it influences model outputs even after deployment.

> Database

- Stores training or behavioral data. If attackers inject malicious data, it directly affects model behavior.
