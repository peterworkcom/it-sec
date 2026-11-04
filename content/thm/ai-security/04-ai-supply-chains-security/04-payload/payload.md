# [payload](https://tryhackme.com/room/payload)

## Golden rule

**Look at model files. Never open them in Python.**
Opening a bad model can run hidden code.

---

## Analysis tools

**pickletools**

- **For:** reading the instructions inside a pickle file
- **Look for:** `os`, `system`, `subprocess`, `eval`, `exec`, `REDUCE`
- **Use:** `python3 -m pickletools file.pkl`

**fickling**

- **For:** a quick "safe or dangerous?" check on pickle files
- **Use:** `fickling --check-safety -p file.pkl`

**modelscan**

- **For:** antivirus-style scan for many model types
- **Shows:** problems with severity (low to critical)
- **Use:** `modelscan -p file`

**pip-audit**

- **For:** finding known security holes in Python packages
- **Reads:** the `requirements.txt` shopping list
- **Use:** `pip-audit -r requirements.txt`
- **Tip:** also check names by eye for fakes (`reqeusts`)

**syft**

- **For:** making an ingredient list (SBOM) of all packages in a folder
- **Use:** `syft /path/to/folder -o table`

**sha256sum**

- **For:** making a file's fingerprint (hash)
- **Check:** compare with the vendor's hash. Same = real. Different = changed.
- **Use:** `sha256sum file`

**inspect_h5_model.py**

- **For:** listing layers in Keras `.h5` models
- **Look for:** **Lambda** layers (can hide code)
- **Use:** `python3 /opt/supply-chain/tools/inspect_h5_model.py file.h5`

---

## File inspection

**file**

- **For:** showing what a file really is (names can lie)
- **Use:** `file model.bin`
- **Tip:** says "Zip archive"? It's a PyTorch file. Unzip it, then check `data.pkl` inside.

**ls -lh**

- **For:** listing files with readable sizes
- **Use:** `ls -lh /opt/supply-chain/models/`

**safe_analysis.py**

- **For:** lab helper script
- **Use:** `python3 /opt/supply-chain/tools/safe_analysis.py file`

---

## Folders

- **models/** -> model files to scan
- **dependencies/** -> `requirements.txt` files for pip-audit
- **project/** -> sample project for syft and pip-audit
- **incident/** -> the attack file to investigate
- **audit/** -> vendor files to verify with hashes and scanners

Move into a folder: `cd /opt/supply-chain/models/`

---

## Quick order

1. `ls -lh` -> what files are there?
2. `file` -> what are they really?
3. `modelscan` -> quick scan
4. `fickling` / `pickletools` -> pickle details
5. `inspect_h5_model.py` -> `.h5` files
6. `sha256sum` -> check fingerprints
7. `pip-audit` / `syft` -> check packages

---

## Pickle red flags (quick read)

- `os` + `system` -> runs a shell command
- `STACK_GLOBAL` -> loads that function
- `REDUCE` -> "run it now"
- Text in quotes nearby -> the actual command
- `$( ... )` -> runs the command inside first
- Random-looking text -> maybe base64. Decode: `echo 'text' | base64 -d`
