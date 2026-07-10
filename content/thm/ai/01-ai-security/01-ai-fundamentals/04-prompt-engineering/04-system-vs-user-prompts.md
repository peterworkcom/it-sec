# system vs user prompts

> `system prompts` - (a.k.a. system messages) are developer-defined, persistent instructions that set the LLM's behaviour, role, tone, and set hard rules what remain constant across sessions and applies to all interactions globally

<table>
  <thead>
    <tr>
      <th></th>
      <th><strong>System Prompt</strong></th>
      <th><strong>User Prompt</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Set by</strong></td>
      <td>Developer / application</td>
      <td>End user</td>
    </tr>
    <tr>
      <td><strong>Nature</strong></td>
      <td>Immutable, constant</td>
      <td>Dynamic, session-specific</td>
    </tr>
    <tr>
      <td><strong>Purpose</strong></td>
      <td>Establishes identity, rules, and safety boundaries</td>
      <td>Carries task-specific requests and data</td>
    </tr>
    <tr>
      <td><strong>Example</strong></td>
      <td>"Never execute code. Always be helpful and professional."</td>
      <td>"Summarise this document for me."</td>
    </tr>
    <tr>
      <td><strong>Priority</strong></td>
      <td>High-priority context that shapes overall behaviour</td>
      <td>Acted on within the system prompt's constraints</td>
    </tr>
  </tbody>
</table>

## The Challenge: Theory vs Reality

> This `instruction hierarchy` sounds solid in theory, however, LLMs process everything as text, regardless of whether something is labelled "system", "developer", or "user"

- the model ultimately sees the instructions as a single sequence of tokens
- boundaries in between not hard architectural barriers
- the model learns to respect labels but this respect is probabilistic

> the model's architecture treats all text fundamentally the same way

## Why This Matters for Security

> a foundation for attack surface is that when system and user inputs merge into a single text stream, clever adversaries can craft user input that mimics or conflicts with system instructions

> the model, trained to be helpful and follow instructions, may struggle to determine which directives take precedence, especially when user input is phrased persuasively or formatted to look authoritative
