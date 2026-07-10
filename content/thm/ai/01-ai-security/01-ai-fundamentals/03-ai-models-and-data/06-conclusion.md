# Conclusion

- `AI` training data is drawn from poorly documented, unaudited sources, meaning most organisations have no reliable answer to where their training data came from, what it contained, or whether it was tampered with

- PII and live credentials routinely end up baked into model weights through large-scale web scraping and cannot be patched out once the model is deployed

- Model-building decisions such as quantisation and federated learning introduce security trade-offs that are rarely documented, meaning organisations inherit unknown behaviour modifications alongside efficiency gains

- Fine-tuning a pre-trained model inherits everything beneath it: safety alignment erodes with as few as 10 adversarial examples, and fine-tuned models are measurably more susceptible to prompt injection than their base counterparts

- Trained model weights are fundamentally opaque; security testing can only sample behaviour rather than audit it, and model cards (the primary transparency mechanism) remain voluntary, frequently incomplete, and sometimes absent entirely
