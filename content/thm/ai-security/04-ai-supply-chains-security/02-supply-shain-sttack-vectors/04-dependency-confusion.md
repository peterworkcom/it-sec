# dependency confusion attacks

> Your project's **dependencies** (the packages it uses) can be attacked too. Not just the model file.

## Dependency confusion

**How pip works:**

- You run `pip install package-name`.
- pip checks all the places it is set up to look.
- It picks the **highest version number**.
- It does not care where the package came from.

**The attack:**

1. Your company has a private package, for example `internal-ml-utils`.
2. That name is not on public PyPI.
3. An attacker registers the same name on PyPI.
4. They give it a very high version, like 99.0.0.
5. pip installs the attacker's version.

## Typosquatting

Attackers register names that look almost like real ones. They hope you make a typing mistake.

Examples:

- `numpy` becomes `numppy` (extra "p")
- `requests` becomes `reqeusts` (letters swapped)
- `scikit-learn` becomes `scikitlearn` (missing hyphen)
- `tensorflow` becomes `tenserflow` (wrong letters)

## Key takeaways

- Check spelling of every package name.
- Be suspicious of very high version numbers.
- Review requirements files before you install.
