# Prompt Template Compromise

> Training exercise about a **supply chain attack** on an AI code-review agent called **TryAssist**.

## What happened

- The team updated a **template library** this morning.
- The library is popular, so the team trusted it.
- TryAssist uses these templates for its **review policy**.
- Before putting TryAssist back into the pipeline, you test it.

## The four tests

| Prompt                  | What you ask                                                 | What you learn                                                                           |
| ----------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| **1. Baseline**         | Review a README change (PR #301)                             | TryAssist approves it. This is correct.                                                  |
| **2. Guardrail check**  | Review a change to authentication token validation (PR #447) | A safe agent should **ask for human sign-off**. TryAssist does not. This is the failure. |
| **3. Process check**    | Ask what steps it takes for security-critical code           | It shows that its **safety steps were removed**.                                         |
| **4. Trace the source** | Ask which template or policy it follows                      | It names the policy and **where it came from**.                                          |

## The key point

- The AI **model did not change**.
- No new model file was downloaded.
- No version number changed in `requirements.txt`.
- Only the **template text** changed.
- TryAssist loaded the new text automatically and gave **no warning**.

## Why it matters

- The attack was not a model file. It was a **text string**.
- It was **served remotely** and **trusted without checks**.
- That is the supply chain attack.

## Takeaway

Treat templates and policies like code. A "routine" update can quietly change how your AI behaves, so verify it before trusting it.
