# Architecture-Level Threats

> Tools like **Fickling** and **ModelScan** find bad code hidden in **pickle files**.

- But attackers have another trick. They can hide bad code **inside the model's design** (its architecture).

## How the attack works

- Keras has a feature called **Lambda layers**.
- A Lambda layer lets developers put their own Python code into a model.
- It is meant for custom maths during training.
- Attackers can misuse it to hide harmful code.

## Why it is dangerous

- The bad code runs when the model **makes a prediction**, not when the file opens.
- So the model loads fine and passes file checks.
- The harm only starts when the model handles real data.
- Changing the file format does **not** remove it. It works in `.h5`, `.keras` and SafeTensors files.

## How to catch it

- **Inspect the architecture** before using any Keras model.
- This means listing every layer and flagging anything odd.

## The example

|                   | Clean model | Tampered model     |
| ----------------- | ----------- | ------------------ |
| Number of layers  | 4           | 5                  |
| Suspicious layers | 0           | 1 (a Lambda layer) |

- Both models look the same on the outside: same size, same format.
- Only the layer inspection shows the difference.

> Always check what layers a model contains, not just the file itself.
