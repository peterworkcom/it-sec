# LLM fundamentals

## Understanding Tokens

> LLMs text input broken down to tokens

- most basic words are 1 token, like "cat" or "dog"
- more "complex" words can be multiple tokens like "butterfly" -> "butter" + "fly"
- a "Hello, how are you?" might become `[15496, 11, 703, 527, 499]`
- the same sentence produce different number depending on the model
- different models use different tokenization

## Determinism vs Nondeterminism

> the same question asked produces different answers with the same model

- this is `nondeterminism`, outputs vary even with identical inputs
- this is a key characteristic of LLMs, what poses a massive challenge to the security community and industry

## Controlling the Chaos

> an LLM is a probability machine what behavior can be steered with these parameters

- Temperature
- Max tokens
- Top-p
- Context Window

## Temperature: The Randomness Dial

- a numerical value, commonly ranging from 0.0 - 2.0, that controls how "adventurous" the model is when picking its next word
- 0.0 to 2.0 -> deterministic to "drunk"

## Max Tokens: The Length Limiter

- caps how long the response can be
- one token roughly equals 0.75 English words, so 100 tokens usually equals about 75 words
- controlling length is a cost-control measure

## Top-P: The Alternative Randomness Dial

- nucleus sampling is temperature's cousin
- sets a shortlist of word
- 0.9 -> 90% most likely option for words
- the higher the value, the bigger the shortlist; the lower the value, the more restricted the model's choices

## Context Window: The Memory Limit

- token limit
- every model has a context window, its maximum "working memory" measured in tokens
- exceed this limit and the model silently truncates earlier context
