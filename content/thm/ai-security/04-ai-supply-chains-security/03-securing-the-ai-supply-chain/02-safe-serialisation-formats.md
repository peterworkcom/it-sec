# Safe Serialisation Formats

## The problem

- Python **pickle** files can run code when you load them.
- This happens through the `__reduce__` method.
- The TryTrainMe breach started this way.
- The best defence is to stop using pickle, or to limit what it can do.

## Defence 1: SafeTensors

- It is a file format from Hugging Face, made for ML model weights.
- It **cannot run code** when loaded.
- It stores only tensor data (weights and biases).
- It checks the header before reading any data.
- It is also fast.

**Watch out when converting from pickle:**

- Converting means loading the old pickle file first.
- A bad file could run its code at that moment.
- So the conversion itself is not risk-free.

**Also remember:**

- SafeTensors does not store Python objects, optimiser state, or training setup.
- For most inference uses, that is fine.

## Defence 2: `weights_only=True`

- `torch.load()` uses pickle inside.
- By default, older PyTorch versions allow full pickle power.
- Setting `weights_only=True` limits it to rebuilding tensors only.
- Risky instructions, like calling `os` or `system()`, are blocked.
- Think of it as putting pickle in a straitjacket.
- **PyTorch 2.6 and later** use this setting by default.
- Older versions need you to set it yourself.

## Limitations

SafeTensors is a big help, but it is not a full defence. Three risks remain:

1. **Fake file extensions**
   - A `.safetensors` file can secretly hold pickle code.
   - This was shown in 2023.
   - A similar bypass hit Hugging Face's SFConvertBot (CVE-2023-6730).
   - Never trust a file extension alone.

2. **Attacks at inference time**
   - SafeTensors only protects at load time.
   - Bad logic in a model's design can still run when the model makes predictions.
   - Example: a Keras Lambda layer can run any Python code on every prediction.

3. **One defence is never enough**
   - The document says later tasks (6 and 7) cover tools to detect these threats.

## Key lesson

Safe serialisation is **necessary, but not sufficient**. Always:

- check the real file format,
- inspect the model's architecture,
- never assume one defence covers everything.
