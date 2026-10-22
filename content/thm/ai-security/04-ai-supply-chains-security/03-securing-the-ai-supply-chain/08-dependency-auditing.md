# Dependency Auditing and SBOMs

> Model files are not the only risk. The packages your project depends on can also be attacked, so they need checking too.

## Pin your versions

- Always write the **exact version** in `requirements.txt`, like `numpy==1.24.3`.
- If you don't, pip grabs the newest version every time.
- An attacker could publish a bad "newest" version, and you would install it automatically.

## Use lockfiles

- A lockfile saves the exact version **and** a unique fingerprint (hash) of every package.
- If someone swaps a package for a fake with the same version number, the fingerprint won't match, and installation stops.
- Two tools that make lockfiles:
  - `pip-compile --generate-hashes` (from pip-tools)
  - `poetry lock` (from Poetry)
- Everyone on the team then installs identical packages.

## Scan for known problems

- **pip-audit** checks your packages against lists of known security flaws.
- It shows each flawed package and which version fixes it.
- Upgrade to the fixed versions to remove those risks.

## Use a private package index

- This protects internal packages from **dependency confusion** (an attacker uploading a public package with your internal package's name).
- Set your private index as `index-url` (checked first).
- Set public PyPI as `extra-index-url` (checked only as a backup).
- This needs your own private registry set up.

## Make an SBOM

- **SBOM** = Software Bill of Materials.
- Think of it as an **ingredient list** for your software.
- It lists every package and version, including hidden ones pulled in by other packages.
- When a new flaw is announced (like Log4Shell in 2021), you can quickly check if you are affected.

**Two main formats:**

| Format    | Run by           | Best for       |
| --------- | ---------------- | -------------- |
| SPDX      | Linux Foundation | Licence checks |
| CycloneDX | OWASP            | Security       |

**Licences matter too.** One library with a strict licence could force you to make your whole project public. An SBOM helps tools spot these clashes early.

## Hands-on with Syft

- **Syft** is a tool that creates SBOMs from a project folder.
- The lab uses it to make a CycloneDX file and to show a readable table.
- A "timeout" warning is normal when offline. You can ignore it.

## ML projects need extra details

- Normal SBOMs list software, but not **models** or **datasets**.
- ML SBOMs are still being developed. They aim to record who trained a model, what data was used, and its known limits.
- For now, add a **model card** alongside your SBOM.

> Without an SBOM, you can't prove that what you deployed is what you approved.
