# AI Supply Chain

Normal software is built from **code**.

AI software is built from code **and trained models**.

Models bring **new risks**.

## What is a trained model?

A model is made of 4 parts:

1. **Architecture**: the shape of the brain (the structure)
2. **Training data**: the examples it learned from
3. **Training process**: the settings used to teach it
4. **Weights**: what it learned, saved in a file

When you download a model, you trust **all 4 parts**.

But you **cannot check** most of them.

## The game save example

Model weights are like a **saved game file**.

- Imagine you download a save file from a stranger.
- It works fine. Your character looks normal.
- But the stranger could have **hidden something** inside.
- You would not notice until it is too late.

**Danger:** some model files (called **pickle** files) can **run hidden code** as soon as you open them.

## Transfer learning

Most teams do **not** train models from scratch. It takes too long.

Instead they:

- **download** a model someone else made
- **fine-tune** it (adjust it a little for their own job)

This is fast. But it has a problem:

- You are building on something made by a **stranger**
- You do not know **what data** they used
- You do not know **how** they trained it

### Hidden backdoors

- A **backdoor** is a secret trick hidden in a model.
- Research shows backdoors can **survive fine-tuning**.
- If a popular model is poisoned, **every app** built on it is poisoned too.

### Adapters (LoRA)

- **LoRA** adapters are small add-on files that change a model.
- Now you must trust **two** things: the model **and** the adapter.
- A clean model + a bad adapter = **still unsafe**.

## The 4 parts of an AI supply chain

| Part             | What it is                      | Example             |
| ---------------- | ------------------------------- | ------------------- |
| **Models**       | Pre-trained AI brains           | GPT-2, BERT         |
| **Datasets**     | Data used to train              | ImageNet            |
| **Frameworks**   | Tools that build and run models | PyTorch, TensorFlow |
| **Dependencies** | Helper packages the tools need  | NumPy, Pillow       |

Each part comes from **someone else**.

Each part is a place where an **attack** could happen.

## The Architecture

It is a **chain of trust**:

- Your app trusts the framework
- The framework trusts the package website
- The website trusts whoever uploaded the package

If **one link breaks**, the **whole system** is at risk.

**One bad part** among thousands of good ones is **enough**.
