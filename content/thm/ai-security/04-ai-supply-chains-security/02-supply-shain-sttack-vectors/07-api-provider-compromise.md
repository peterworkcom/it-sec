# API Provider Compromise

> With an API there is no file to scan, so the attacks are different.

## The 4 attack types

### Silent model updates

- The provider changes the model **without telling you**.
- The API address stays the same, but the behaviour changes.
- **Risk:** The code reviewer starts missing security problems, and nobody gets an alert.
- **Defence:**
  - Pin the model version.
  - Log the model version from every response.
  - Test against a fixed set of examples and watch for changes.

### API key compromise

- Your API key is like a password.
- If it leaks, an attacker can use it, read what you sent, or run up your bill.
- It leaves **no trace on your systems**.
- **Risk:** A CI/CD log leak exposes every past request, plus the key.
- **Defence:**
  - Use a secrets manager.
  - Rotate keys if you suspect a leak.
  - Set spending alerts and rate limits.

### Prompt template injection

- Many teams copy system prompts from shared libraries.
- A prompt controls how the model behaves, so it is a **supply chain item**.
- **Risk:** A bad update tells the AI to approve every pull request.
- **Defence:**
  - Treat prompts like code.
  - Keep them in your own repository.
  - Never auto-update them without a review.

### Upstream training data poisoning

- You can't see how the provider trained the model.
- Bad training data can make the model biased or unsafe.
- **Risk:** The model rates SQL injection as less serious than it is, and nothing shows it.
- **Defence:**
  - There is no file to scan, so the fixes are **operational**.
  - Red-team the model regularly.
  - Keep human review for important decisions.
  - Don't blindly trust the model.

## Key takeaway

With hosted APIs you give up control. You manage the risk through **monitoring, testing, and human checks**.
