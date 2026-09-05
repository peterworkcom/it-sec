# data based threats

> Sometimes LLMs can inadvertently leak data by design because they memorise and regurgitate patterns from their training data

## Training Data Extraction

> `Target / Attack Surface`: Training dataset (confidentiality)

> `Input`: Crafted prompts designed to trigger memorised content

> `Output`: Verbatim or near-verbatim training data (text, PII, secrets)

- Training data extraction attacks aim to recover actual sequences from the model's original training data by interacting with the model.

- one sign of a retrieved training dataset can be a unusually high likelihood/confidence about it from the LLM

## Membership Inference

> `Target / Attack Surface`: Training dataset membership (privacy metadata)

> `Input`: A known candidate data sample already possessed by the attacker

> `Output`: A yes/no (or probability) decision indicating whether the sample was used in training

- Membership inference attacks ask whether the model ever recorded a specific data sample.

- attacker already possesses the exact candidate data sample and is only testing whether that known sample influenced the model's training

- focuses on confirming whether a sample the attacker already has was in the training set

- membership inference often exploits statistical quirks or "fingerprints" left by training data

## Prompt Leakage (LLM07:2025 - System Prompt Leakage)

> `Target / Attack Surface`: System prompt / developer instructions

> `Input`: User prompts that ask the model to reveal or reflect on its instructions

> `Output`: Partial or full disclosure of hidden system or developer prompts

> `Mitigation`: Never treat the system prompt as a security boundary; assume it can be extracted. Never embed live credentials, API keys, or secrets in it.

- LLMs don't just operate using the learnings from their training data, but also use hidden instructions known as system or developer prompts

- it can exposes the proprietary business logic or safety measures, companies put into their models
