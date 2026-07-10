# the inheritance problem

> To make LLMs training cost effective most organizations start with a pre-trained model

## Pre-Trained Models & Fine-Tuning

> A `pre-trained model` is one that has already been trained on a large, general-purpose dataset

- broad language understanding
- grammar
- facts
- reasoning patterns
- world knowledge

> `Fine-tuning` is the process of continuing to train one of these pre-trained models on a smaller, task-specific dataset to be specialized for a particular use case

- healthcare
- law
- cybersecurity
- ...

> `fine-tuning` changes, the model's task-specific behavior, but does not change the base `pre-trained model` weights

## The Inheritance Problem

> a fine-tuned model inherit everything that the pre-trained model already contains, like biases, behaviors, safety levels

- `Safety alignment erodes, not breaks`: even small fine-tuning on legitimate data degraded safety as a side effect, the model hasn't forgotten how to be safe/unsafe, but the probability weights have just shifted, making unsafe responses more likely again

- `Specialisation increases attack surface`: fine-tuned models are more susceptible to prompt injection than the base pre-trained model, a fine-tuned financial model more responsive to prompt attacks framed in financial terms

- `Version matters, and it's rarely tracked`: fine-tuning always targets a specific checkpoint of a base model, that checkpoint later might turned out to contain a backdoor or problematic training data

## Inheritance Tax

> If organization deploys a fine-tuned model, it deploys the whole model with the fine-tuned and pre-trained parts too.
