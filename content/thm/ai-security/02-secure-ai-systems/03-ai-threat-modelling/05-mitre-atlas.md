# MITRE ATLAS: The AI Threat Technique Catalogue

> `ATLAS (Adversarial Threat Landscape for Artificial-Intelligence Systems)` is a knowledge base of adversary tactics and techniques targeting AI and ML systems

- Think of it as [MITRE ATT&CK](https://attack.mitre.org/)'s AI-focused counterpart
- [MITRE ATLAS](https://atlas.mitre.org/matrices/ATLAS) gives you the same structured approach for AI systems

## How ATLAS Is Structured

<table>
  <thead>
    <tr>
      <th>Component</th>
      <th>What It Answers</th>
      <th>Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Tactic</strong></td>
      <td><em>Why</em> the adversary's goal</td>
      <td>ML Attack Staging (AML.TA0012)</td>
    </tr>
    <tr>
      <td><strong>Technique</strong></td>
      <td><em>How</em> the method used to achieve it</td>
      <td>Data Poisoning (AML.T0020)</td>
    </tr>
    <tr>
      <td><strong>Sub-technique</strong></td>
      <td><em>Specifically how</em> a variant of the method</td>
      <td>Craft Adversarial Data (AML.T0043.004)</td>
    </tr>
    <tr>
      <td><strong>Mitigation</strong></td>
      <td><em>What stops it</em> the defensive countermeasure</td>
      <td>Input validation, data provenance tracking</td>
    </tr>
  </tbody>
</table>

- `Tactics` are the columns of the ATLAS matrix
- `Techniques` sit within those columns
- When you are threat modeling, you start with a tactic (what the attacker wants to achieve) and drill into techniques (how they'd achieve it against your specific system)

## Key Techniques You Need to Know

**five ATLAS techniques that are most relevant to the AI deployments that will encounter a defender**

> `Data Poisoning (AML.T0020)`: Injecting malicious data into training pipelines to corrupt model behaviour

- Maps to STRIDE: Tampering

> `Model Extraction (AML.T0024)`: Systematically querying a model's API to reconstruct a functional copy

- Maps to STRIDE: Information Disclosure.

> `Evade ML Model (AML.T0015)`: Crafting adversarial data that prevents a model from correctly identifying the contents of the input

- This threat spans multiple STRIDE categories simultaneously
- Tampering
- Spoofing
- Elevation of Privilege

> `LLM Prompt Injection (AML.T0051)`: Manipulating an LLM's behaviour by injecting instructions through direct user input or indirect content the model processes. The distinction matters: direct injection is a user crafting malicious input in the chat interface, while indirect injection is malicious instructions embedded in content the model retrieves or processes (such as documents in a RAG pipeline)

- Maps to STRIDE: Tampering

> `Backdoor ML Model (AML.T0018)`: Embedding hidden triggers in a model during training, it as a logic bomb, but inside a neural network

## Using ATLAS During Threat Modeling

> ATLAS isn't a replacement for STRIDE, it's the enrichment layer

- `Start with STRIDE`: Walk each AI component through the six threat categories to identify "what could go wrong"

- `Enrich with ATLAS`: For each identified threat, look up the corresponding ATLAS technique to get the specific how, including documented attack methods and real-world case studies

- `Apply mitigations`: ATLAS provides recommended countermeasures for each technique, giving you actionable defensive guidance
