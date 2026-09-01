# Understanding AI Safety Alignment

> Safety refusals in AI models aren't rules. They're learned habits.

The model doesn't check a rulebook before answering. It predicts what words come next. Training just made "I can't help with that" the most likely next words for certain kinds of requests.

## How refusals get built

> Base models trained on raw internet text will complete anything, with no sense of harm.

Companies then apply safety training, like **RLHF**, where human raters rank outputs, to push models toward helpful, harmless answers.

## Why this makes safety fragile

> Three points from the text:

- Phrasing matters. The same request can be refused one way and accepted another.
- Safety lives in specific "directions" inside the model, and research shows these can be removed without hurting other abilities.
- It fades easily. Fine-tuning on just 1,000 harmless samples can degrade alignment by over 60%.

## The helpfulness trade-off

> You can't max out both helpfulness and harmlessness.

- A totally harmless model refuses everything.
- A totally helpful model complies with everything.

Real models sit somewhere between. The cost of that compromise is called the alignment tax, and it's why a toxicologist or a novelist sometimes gets blocked from legitimate work.

## The closing paradox

Training a model to spot harmful patterns also teaches it pattern matching, the very skill that can be turned against it.

Models also can't tell system instructions apart from user input. It's all one token stream.

So jailbreaking isn't hacking. There's no backdoor. It's shifting the odds until compliance becomes more likely than refusal.

Or as the text puts it: the jail was never locked, just a statistical tendency waiting to be nudged.

## Word list

- **Base model**: a model trained on raw text, with no safety training.
- **Safety alignment**: training that makes a model refuse harmful requests.
- **RLHF**: training a model using human rankings of its answers.
- **Weights**: the numbers inside a model that hold what it has learned.
- **Activation space**: the internal map of numbers a model uses while it works.
- **Alignment tax**: the usefulness a model loses when you make it safer.
- **Jailbreaking**: wording a prompt so a model answers instead of refusing.
