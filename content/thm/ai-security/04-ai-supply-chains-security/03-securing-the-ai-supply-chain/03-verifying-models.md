# Verifying ML Models

> Safe file formats stop code from running when you load a model. But they don't prove the model is the _real_ one. This task teaches you to **verify** models too.

## Checksums (SHA-256)

- A checksum is like a fingerprint for a file.
- If even one byte changes, the fingerprint changes completely.

**Commands to use:**

- `cat /opt/supply-chain/models/checksums.json` shows the expected hashes.
- `sha256sum` on each model file gives the actual hashes.

> **Tip:** A checksum shows the file hasn't changed. A **digital signature** also shows _who_ made it.

## Model Cards

A model card is the model's documentation. Check these parts:

- **Model details:** who made it, version, licence.
- **Intended use:** what it's for.
- **Training data:** what data was used.
- **Performance:** test results.
- **Limitations:** known weaknesses.

> **Red flag:** a missing or thin model card is one of the strongest warning signs.

## Hidden Risks

- **LoRA adapters:** small add-on files that change a model's behaviour. A safe model plus a bad adapter is still unsafe. Check adapters the same way.
- **Merging and conversion services:** these can inject bad code. Treat any converted model as brand new and check it again.

## The 5-Step Framework

Every model must pass all five gates:

1. **Quarantine:** download to a safe, separate area first.
2. **Source check:** confirm the author and their reputation.
3. **Integrity check:** compare SHA-256 checksums.
4. **Security scan:** run tools like Fickling and ModelScan, and review the model card.
5. **Approve or reject:** only then move it to production.

## Key points

- no single check is enough
- a model can pass scans and still hide a backdoor
- use several checks together
