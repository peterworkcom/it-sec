# AI-Specific Assets and Attack Surfaces

> AI systems aren't just traditional applications with a model bolted on. They have different assets, behaviours, and ways of failing, and our threat models need to account for all of it.

<table>
  <thead>
    <tr>
      <th>Asset</th>
      <th>What It Is</th>
      <th>Why It Matters</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <strong> Training Data </strong>
      </td>
      <td>The datasets used to teach the model its behaviour</td>
      <td>
        Poisoning this data corrupts the model's outputs at the source. Unlike a database
        compromise, the damage is baked into the model itself.
      </td>
    </tr>
    <tr>
      <td><strong>Model Weights / Parameters</strong></td>
      <td>The numerical values that define what the model has learned</td>
      <td>
        These <em>are</em> the model. Stealing them means an attacker has a functional copy of your
        AI, months of compute and potentially millions in investment, gone.
      </td>
    </tr>
    <tr>
      <td>
        <strong> Embedding Vectors</strong>
      </td>
      <td>
        Numerical representations of text or data used for similarity computation, retrieval, or as
        input features to downstream models
      </td>
      <td>
        Used in RAG pipelines, recommendation engines, and fraud detection systems. Poisoning or
        manipulating embeddings alters what information models see at query time.
      </td>
    </tr>
    <tr>
      <td><strong>System Prompts</strong></td>
      <td>Instructions that define the model's behaviour, constraints, and persona</td>
      <td>
        Leaking these reveals your security controls, business logic, and guardrails, giving
        attackers a roadmap to bypass them.
      </td>
    </tr>
    <tr>
      <td><strong>Feature Stores</strong></td>
      <td>Preprocessed data repositories that feed real-time model inputs</td>
      <td>
        Tampering with features changes what the model "sees" at inference time, without touching
        the model itself.
      </td>
    </tr>
    <tr>
      <td>
        <strong> Model Registry / Artifacts</strong>
      </td>
      <td>Stored versions of trained models ready for deployment</td>
      <td>
        A compromised registry means an attacker can swap a legitimate model for a backdoored one,
        and no one may notice until it's too late.
      </td>
    </tr>
  </tbody>
</table>

> Ai systems have Two main characteristics:

- `Non-deterministic behaviour`: AI models, especially LLMs, can produce different outputs for the same input, this makes testing, auditing, reproduction significantly harder

- `The black box problem`: Most AI models, lack the explainability of traditional application logic, this forces defenders to think in terms of input-output behaviour and failure modes rather than code-level inspection
