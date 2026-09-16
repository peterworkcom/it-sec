# Why the attacks worked

- AI refusals are not hard rules. They are habits the model learned in training.
- A jailbreak works by making "yes" the most likely next word.
- So you are changing the odds, not breaking a wall.

## What this means

- Prompt injection cannot be fully fixed. It can only be reduced.
- Anyone promising a perfect fix is selling snake oil.

> The system prompt is not a wall, a better system prompt helps, but it has limits.

- The system prompt is written in plain language, like everything else the AI reads.
- The AI gives it priority, but only because of training. That is also just odds.
- Clever user input, fake conversations, or outside content can outweigh it.

## Defence-in-depth

> Since no one defence is reliable, you stack many. This gives three benefits:

- More effort for attackers: Each extra layer makes success harder and slower.
- Smaller blast radius: A hacked AI can do less damage.
- Earlier detection: More checkpoints mean attacks get caught sooner.

> This is the same idea used across all good security: assume breach, layer defences, keep watching.

| Layer                   | What it does                                          |
| ----------------------- | ----------------------------------------------------- |
| System prompt hardening | Makes the AI's instructions harder to override        |
| Input guardrails        | Catches bad instructions before they reach the AI     |
| Deployment controls     | Limits what a hacked AI can do                        |
| Output validation       | Checks the AI's answers before other systems use them |
