# prompt injection in action

## real life examples

> Bing "Sydney" Leak (2023)

- A student asked Bing's AI to repeat "the document above."
- The AI leaked its secret internal rules and codename ("Sydney").

> Remoteli.io Twitter Bot (2022)

- A company's Twitter bot would repeat any instructions sent to it.
- A user tricked it into posting offensive, false content.
- The company had to shut the bot down.

> $1 Chevy Tahoe (2023)

- A user told a car dealership's chatbot to agree to anything.
- The bot "agreed" to sell a truck for $1.
- It wasn't legally binding, but it caused bad press.

## Prompt Injection Techniques

> Synonym Swapping

- Attackers reword blocked phrases.
- Example: swap "ignore previous instructions" for "disregard the aforementioned rules."
- Meaning stays the same. Blocklists miss it.

> Hiding Instructions in Formatting

- Attackers hide commands inside HTML tags, code comments, or similar.
- Humans don't see them.
- The AI still reads and follows them.

> Fake Conversation Injection

- Attackers write a made-up chat log.
- It looks like the AI already agreed to break its rules.
- The AI then continues that fake pattern.

> Multi-Turn Shaping

- Attackers plant an instruction early in a chat.
- It sits quietly, unused.
- Later, a "trigger" phrase activates it.
- Example: getting an email assistant to leak confidential info it would normally redact.
