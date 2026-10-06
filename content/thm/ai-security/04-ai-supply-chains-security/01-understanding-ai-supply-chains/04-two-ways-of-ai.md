Here's a clear, simple summary:

**The Big Idea**

There are two ways companies use AI models. Each way has different risks.

**Way 1: Downloading Model Files**

You download the AI model yourself. You run it on your own computers.

Risks depend on the file type:

- **.pkl, .pt, .bin**: Can run hidden harmful code when opened
- **.safetensors**: Safe. Just stores numbers, no code
- **.h5** (Keras format): Not as risky as pickle, but can still hide code
- **.gguf** (used for LLaMA, Mistral, Qwen): No hidden-code risk, but other attacks are still possible

**Extra note on GGUF files:**
These are usually "compressed" (called quantisation) to make them smaller and faster. If someone else did that compression step, you're trusting their work too, not just the original model.

**Way 2: Calling Models Through an API**

You send a message to a company (like OpenAI or Anthropic). They run the model. You get an answer back.

You never touch the actual file.

This feels safer, but you're still trusting them with:

- What data they trained on
- Whether they changed or fine-tuned the model
- How they host and secure it
- Whether they quietly update the model later

**Summary**

Both ways involve trust.

- **Downloading** = you trust the file itself
- **API** = you trust the company's entire process

You can't fully check either one on your own, but the things you're trusting are different.
