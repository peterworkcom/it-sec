# Investigating a Malicious Model

> A company called TryTrainMe thinks its AI code reviewer model is **compromised**. The file is called `code_reviewer.pkl`. This lab shows how to check it **safely**.

## The golden rule

**Never open an untrusted pickle file with `pickle.load()`.**

Why? It runs any hidden code inside the file straight away.

## The steps:

**Step 1: Check file size**

- Suspicious file: 8.1 MB
- Clean file: 2.0 MB
- It is 4 times bigger. That is a clue, but not proof.

**Step 2: Check file type**

- The `file` command says "data" for both files.
- So it cannot tell good from bad. We need a closer look.

**Step 3: Look inside safely**

- Use `python3 -m pickletools`.
- It reads the file **without running it**.

**Step 4: Spot the red flags**
In the bad file, we see:

- `os` and `system`, which run commands on the computer
- `curl http://...`, which contacts an outside website
- `REDUCE`, which actually runs the command

**Step 5: Compare with the clean file**

- The clean file only has normal data, like lists and numbers.
- It has no `os`, no `system`, and no web links.

**Step 6: Use the helper script**

- `safe_analysis.py` gives a short report.
- Its verdict: **UNSAFE**.

## Words to watch for in pickle files

| Word          | How worried to be                          |
| ------------- | ------------------------------------------ |
| os            | Very worried                               |
| system, popen | Very worried                               |
| subprocess    | Very worried                               |
| socket        | Very worried                               |
| eval, exec    | Very worried                               |
| curl, wget    | Very worried                               |
| STACK_GLOBAL  | A little worried. Check what it points to. |
| REDUCE        | A little worried. Check the context.       |

## How the attack happened

1. The attacker made a fake model with hidden code.
2. They uploaded it to Hugging Face.
3. An engineer at TryTrainMe searched for a code review model.
4. The engineer downloaded it because the page looked professional.
5. The engineer loaded it with `torch.load()`.
6. The hidden code ran instantly and sent a signal to the attacker.
7. The attacker got access.

All of this took only **seconds**.

## Key lessons

- A professional-looking page does not mean a file is safe.
- Always inspect model files before loading them.
- Use `pickletools` to look without running.
- Look for `os`, `system`, `curl`, and `REDUCE`.
