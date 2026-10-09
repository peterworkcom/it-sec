# Model Repository Attacks

> **Hugging Face Hub** has over 1 million models. It is the main target.

## How the Hub works

- It is like GitHub, but for ML models.
- Organisations have their own names, like `google` or `meta-llama`.
- Each model has a **model card**. It explains what the model is and how it was trained.
- People decide who to trust by looking at:
  - download counts
  - verified organisations
  - community ratings

## Fake model names (typosquatting)

Attackers copy a real name and change it a little.

- `bert-base-uncased` becomes `bert-base-uncased-v2` (added "-v2")
- `meta-llama/Llama-2-7b` becomes `meta-Ilama/Llama-2-7b` (a capital "I" looks like a small "l")
- `openai/whisper-large` becomes `openai-releases/whisper-large` (added "-releases")

## Fake organisations

Attackers make a name that sounds trustworthy.

- `google` becomes `google-research-models`
- `meta-llama` becomes `meta-llama-community`
- `trustworthy-ai-lab` has no real organisation behind it

**The `trustworthy-ai-lab` example:**

- The name sounds good.
- But it has no verification badge.
- It has no history.
- It has very few downloads.

## Hacking a real repository

This is more dangerous. The attacker does not need a fake name.

**Real case:** Lasso Security, November 2023.

- They found **over 1,500** exposed Hugging Face tokens in public code.
- **655** of them could **write** to big organisations, including Google, Meta and Microsoft.

**What an attacker can do with such a token:**

1. Push a bad update to a trusted model.
2. Use the real, trusted name.
3. Nobody has to be tricked into picking a fake.

**Important:**

- The warning signs below catch **fake** repositories.
- They do **not** catch a **hacked real** one.
- So you still need to **scan the files** every time.

## 5. Warning signs checklist

**Download count**

- Safe: thousands to millions
- Suspicious: under 500

**Organisation**

- Safe: verified badge and a known name
- Suspicious: no badge and a generic name

**Model card**

- Safe: detailed (design, training data, results, limits)
- Suspicious: missing, thin or generic

**Upload date**

- Safe: fits the model's story
- Suspicious: very new for a model that claims to be well known

**File formats**

- Safe: SafeTensors offered next to pickle
- Suspicious: pickle only

**Dependencies**

- Safe: common, well-known packages
- Suspicious: unusual or private packages

## Key takeaways

- Look closely at names. Check for small changes in spelling and look-alike letters.
- Check the badge, downloads and model card.
- Prefer **SafeTensors** over pickle.
- A trusted repository can still be hacked, so **always scan files**.
