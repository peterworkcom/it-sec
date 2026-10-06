# Malicious Model Files

> AI model files can hide harmful code. You can't tell by looking at the file.

## What is serialisation?

- It means saving a trained model to a file.
- Think of **packing a suitcase**.
- Loading the file is **unpacking the suitcase**.
- Files like `.pkl` and `.pt` use a tool called **pickle**.

## Why pickle is risky

- Pickle uses a special method called `__reduce__`.
- It tells Python how to rebuild an object.
- It can tell Python to run **any command**.
- Pickle does not check what the command is.
- The command runs the moment you load the file.
- `torch.load()` is risky too, because PyTorch uses pickle inside.

> **Simple comparison:** it is like a Word document that secretly installs malware when you open it.

## What attackers can do

- **Reverse shell:** take full control of your machine
- **Data theft:** steal passwords or source code
- **Crypto mining:** use your computer to make cryptocurrency
- **Reconnaissance:** look around to see who and what is on your system

## Attacks inside the model design

- Keras has **Lambda layers**. These are custom steps inside the model.
- They are normally useful, for example for reshaping data.
- An attacker can hide a trigger in one.
- If the model sees a secret input, it gives the attacker's chosen answer.
- This runs **every time the model makes a prediction**, not when it loads.

## Pickle vs Lambda layer

|                       | Pickle       | Lambda layer    |
| --------------------- | ------------ | --------------- |
| When it runs          | When loading | When predicting |
| Severity              | Critical     | Medium          |
| Survives SafeTensors? | **No**       | **Yes**         |

## SafeTensors is not a full fix

- SafeTensors is a safer file format.
- It removes pickle attacks.
- It does **not** remove Lambda layers, because they are part of the model design.

## GGUF and local AI models

- GGUF is used for models you run on your own computer.
- Examples are LLaMA, Mistral and Qwen.
- GGUF does **not** use pickle, so it won't run Python code on load.
- But it is **not risk-free**.
- Someone can retrain a model with a hidden backdoor before converting it.
- A scan can't easily find this.

## How to stay safer

- Check **who made** the file.
- Check download counts and upload dates.
- Prefer files with **published checksums**.
- Be careful with pre-made GGUF files from unknown people.

## The one thing to remember

> **A model file is not just data. Treat it like a program you are about to run.**
