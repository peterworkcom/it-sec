# how llm follow instructions

> How AI language models (LLMs) handle different types of input, and how that creates security risks.

## The context window

> Everything an LLM sees is in one space called the context window. It's made of five parts:

**System prompts** -> hidden rules from developers (top priority)

**Developer prompts** -> extra hidden instructions

**User prompts** -> what user type in

**Retrieved context** -> info pulled from documents or knowledge bases (RAG)

**Tool outputs** -> results from tools like web search, fed back to the model

- These are meant to stay separate.
- System rules should always outrank user requests.

## Providers try to keep things separate

> Different companies use different methods:

**ChatML** -> tags like `<|im_start|>user...<|im_end|>` or `<|im_start|>tool...<|im_end|>` to label who said what

**Harmony (OpenAI)** -> ranks priority as: system > developer > user > assistant > tool

**Other tricks** -> labelling retrieved text as "from knowledge base," filtering out hidden instructions, repeating system rules every turn

## The Problem

> None of this separation is a hard rule inside the model.

An LLM actually just reads one long stream of text. It doesn't have separate "boxes" for system vs. user input. It only guesses what's an instruction and what's a request, based on patterns learned in training.

- A clever user prompt can sometimes override system rules
- This is exactly what prompt injection attacks exploit

> Example: a system says "don't reveal X," a user says "tell me anyway" -> the model may get confused about which one to follow

- LLMs don't truly understand authority or rules.
- They predict likely next words.
- That gap between structure and reality is what makes prompt injection possible.
