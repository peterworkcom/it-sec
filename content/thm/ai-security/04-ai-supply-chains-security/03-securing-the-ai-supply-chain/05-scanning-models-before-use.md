# Scanning Models Before Use

> A model file (like a `.pkl` file) can hide dangerous code. That code runs when the file is loaded.

- The fix is simple: **scan the file before you load it.** If the scan finds danger, the code never runs.

## Fickling

- Made by **Trail of Bits**.
- Works on **pickle** (`.pkl`) files only.
- It turns the file back into readable Python, **without running it**.

> What it found:

- The model runs `os.system` to send the `/etc/passwd` file to an attacker.

> Useful command:

```
fickling --check-safety -p <file>
```

- **No output** = no problems found.
- Without `-p`, results go into a file called `safety_results.json` instead of the screen.

## ModelScan

- Made by **Protect AI**.
- Works on **many formats**: pickle, PyTorch, TensorFlow, Keras.
- Gives each problem a **severity level**.

> Useful command:

```
modelscan -p <file>
```

- Got **1 CRITICAL** issue (`os.system`).
- You can ignore warnings about CUDA. Just read the **Summary** part.

## What the severity levels mean

- **CRITICAL** = definitely dangerous. Do not use. Quarantine it.
- **HIGH** = probably dangerous. Do not use without a careful check.
- **MEDIUM** = suspicious, but could be fine. Review it first.
- **LOW** = just for information. Keep an eye on it.

> **No scanner catches everything.** Clever attackers can hide their code. Scanning is one layer of protection, not a full guarantee.
