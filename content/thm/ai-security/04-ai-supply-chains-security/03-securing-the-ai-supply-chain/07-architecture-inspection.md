# Architecture Inspection

A security tool flagged a model layer as **suspicious**. That means "look closer." It does **not** prove the layer is harmful. This lesson shows you how to look closer.

## Step 1: Scan the model with ModelScan

Run ModelScan on the model file `image_classifier_v2.h5`.

It finds **one issue**: a **Lambda layer**.

The severity is **MEDIUM**, not CRITICAL. Why?

- Lambda layers can run custom code, so they can be risky.
- But developers also use them for normal, safe reasons.
- So the tool says "review this," not "delete this."

## Step 2: Look inside the model with h5py

Use a script to read the model's layers **without running the model**. This keeps you safe.

Check two models:

1. `image_classifier.h5` (the original)
2. `image_classifier_v2.h5` (the suspicious one)

## Step 3: Compare the two

Look for:

- **Extra layers.** One model has more layers than the other.
- **Warning labels.** Look for `[WARNING]` instead of `[OK]`.
- **Harmless-sounding names.** Attackers may hide bad code behind names like `normalize_output` or `apply_scaling`.

**Rule:** If you didn't build the model yourself, check every Lambda or custom layer.

## Key takeaway

> **SafeTensors is not enough on its own.**

- SafeTensors stops one type of attack: hidden code in pickle files.
- It does **not** stop a harmful Lambda layer inside the model's design.
- A bad Lambda layer works the same in any file format (`.h5`, `.keras`, or SafeTensors).

> So you need to do **two** checks:

1. Scan the file format.
2. Inspect the model's architecture (its layers).
