# A Secure LLM Mindset

- `LLMs introduce a unique attack surface` distinct from traditional ML systems, driven by natural language interaction, context handling, and emergent behaviour.

- `Data-based threats` exploit how LLMs learn from and memorise training data, enabling attacks such as training data extraction, membership inference, and system prompt leakage.

- `Model-based threats` target the model itself, including model extraction (theft of model behaviour or weights) and model inversion (reconstructing sensitive training data).

- `System-based threats` arise from how LLMs process all inputs as a single context, enabling prompt injection, context window overflow, and memory poisoning.

- `User-based threats` leverage LLMs as force multipliers for social engineering, increasing the effectiveness of phishing, scams, and trust exploitation.

---

<table>
  <thead>
    <tr>
      <th><strong>Type</strong></th>
      <th><strong>Threat</strong></th>
      <th><strong>Target / Attack Surface</strong></th>
      <th><strong>Input</strong></th>
      <th><strong>Output</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Data-Based</strong></td>
      <td>
        <strong> Training Data Extraction</strong>
      </td>
      <td>Training dataset (confidentiality)</td>
      <td>Crafted prompts designed to trigger memorised content</td>
      <td>Verbatim or near-verbatim training data (text, PII, secrets)</td>
    </tr>
    <tr>
      <td><strong>Data-Based</strong></td>
      <td>
        <strong> Membership Inference </strong>
      </td>
      <td>Training dataset membership (privacy metadata)</td>
      <td>Known candidate data sample already possessed by the attacker</td>
      <td>Yes/no (or probability) decision indicating whether the sample was used in training</td>
    </tr>
    <tr>
      <td><strong>Data-Based</strong></td>
      <td><strong>Prompt Leakage / System Prompt Exposure (LLM07:2025)</strong></td>
      <td>System prompt / developer instructions</td>
      <td>Prompts asking the model to reveal or reflect on its instructions</td>
      <td>Partial or full disclosure of hidden system or developer prompts</td>
    </tr>
    <tr>
      <td><strong>Model-Based</strong></td>
      <td><strong>Weight Extraction (Model Stealing)</strong></td>
      <td>Model parameters (intellectual property)</td>
      <td>Large volumes of carefully chosen API queries</td>
      <td>A surrogate or distilled model replicating the original model's behaviour</td>
    </tr>
    <tr>
      <td><strong>Model-Based</strong></td>
      <td><strong>Model Inversion</strong></td>
      <td>Model's internal representations</td>
      <td>Unknown or partially known data, or model embeddings/outputs</td>
      <td>New training data or attributes reconstructed from the model</td>
    </tr>
    <tr>
      <td><strong>System-Based</strong></td>
      <td>
        <strong> Context Window Poisoning (Prompt Injection)</strong>
      </td>
      <td>LLM context window (instruction hierarchy)</td>
      <td>Attacker-controlled text embedded in input or retrieved content</td>
      <td>Altered behaviour, policy bypass, unintended actions</td>
    </tr>
    <tr>
      <td><strong>System-Based</strong></td>
      <td><strong>Context Overflow / Unbounded Consumption (LLM10:2025)</strong></td>
      <td>Context window size and system resources</td>
      <td>Excessively large prompts or documents</td>
      <td>Truncated safeguards, degraded responses, or denial of service</td>
    </tr>
    <tr>
      <td><strong>System-Based</strong></td>
      <td><strong>Stateful Conversation Manipulation (Memory Poisoning)</strong></td>
      <td>Persistent conversation memory</td>
      <td>Malicious statements intended to be stored as long-term context</td>
      <td>Persistent misinformation or corrupted future responses</td>
    </tr>
    <tr>
      <td><strong>User-Based</strong></td>
      <td>
        <strong> LLM-Powered Social Engineering </strong>
      </td>
      <td>Human cognition and decision-making</td>
      <td>Contextual or personal information used to craft persuasive output</td>
      <td>Manipulated users ( phishing success, fraud, coerced actions)</td>
    </tr>
    <tr>
      <td><strong>User-Based</strong></td>
      <td><strong>Trust Exploitation / Misinformation (LLM09:2025)</strong></td>
      <td>User trust and judgment</td>
      <td>Confident but incorrect or maliciously framed prompts</td>
      <td>Users accepting false, unsafe, or harmful information</td>
    </tr>
  </tbody>
</table>
