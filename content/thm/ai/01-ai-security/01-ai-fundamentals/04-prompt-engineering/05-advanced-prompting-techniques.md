# Advanced Prompting Techniques

## The Shot Spectrum

> `in-context learning`: the model learns directly from examples embedded in your prompt rather than through traditional training, "shot" refers to training examples you provide within your prompt

- `Zero-shot` prompting gives the model a task with no examples
- `One-shot` provides a single example to clarify expectations
- `Few-shot` includes 2-5 examples so the model recognises patterns

## Chain-of-Thought

> `Chain-of-Thought (CoT)` prompting asks models to break down complex tasks into intermediate steps, mimicking how humans solve multi-step problems, instead of jumping to conclusions, the model "thinks out loud".

- `Zero-shot CoT` - `Let's think step by step` as a prompt make a significant change on the model reasoning without examples

## Prompt Templates

> Instead of manually typing prompts or using the tools to generate prompts for tasks, it makes sense to save and catalogue the template for future use,

- `Prompt Templates` can ensure consistency across team members, reduce cognitive load, and bake in best practices

## When to Use

- `Zero-shot`: Simple, well-defined tasks where instructions are clear
- `One-shot`: Format clarification or style guidance needed
- `Few-shot`: Complex patterns, domain-specific outputs, multiple edge cases
- `Chain-of-Thought`: Multi-step reasoning, security analysis requiring justification, debugging complex logic
- `Prompt Templates`: Repeatable tasks, team standardisation, quality control
