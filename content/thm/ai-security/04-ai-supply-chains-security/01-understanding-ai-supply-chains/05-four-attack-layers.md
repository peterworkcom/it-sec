# Four attack layers

> An attacker does not need to control the whole supply chain. **They only need one weak point.**

- There are **4 layers** where attacks can happen.

## Layer 1: The Model

This is the part that is **unique to AI**.

There are **3 types** of model attack:

1. **Serialisation**
   - Code is hidden in the model file.
   - It runs when you **load** the file.

2. **Architecture**
   - Bad logic is built into the model's layers.
   - It runs on **every prediction**.

3. **Weights**
   - The model's learned values are changed slightly.
   - The model behaves badly on **certain inputs**.

**Key point:** Removing hidden code only stops **type 1**. Types 2 and 3 are still there. You must check **all three**.

## Layer 2: Dependencies

These are the **packages and libraries** your project uses.

Attackers use:

- **Dependency confusion**: tricking your system into installing the wrong package
- **Typosquatting**: fake packages with names close to real ones
- **Fake packages** that look professional but hide malware

## Layer 3: Data

This is the **training data**. Poisoned data is **hard to spot**.

- Changing just **0.1%** of the data can add a hidden backdoor.
- The model still looks accurate on normal data.
- To break the model (denial of service), only **0.001%** may be needed.

## Layer 4: Infrastructure

These are the **systems that store and share** AI files.

Attackers can:

- Break into **model or package repositories**
- Add bad steps to **build pipelines** (CI/CD)
- **Steal maintainer logins** to push bad updates that look trusted

## Putting It Together

Attackers can **combine** layers. For example, one attacker could:

1. Take over a Hugging Face account -> **Infrastructure**
2. Upload a model with hidden code -> **Model**
3. List fake packages in the requirements file -> **Dependencies**
4. Share poisoned data with it -> **Data**

> **One download could attack all four layers at once.**
