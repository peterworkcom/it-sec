# OWASP LLM Top 10: Mapping Risks to Components

## What Is the OWASP LLM Top 10?

> The OWASP Top 10 for LLM Applications is a community-driven list of the most critical security risks specific to large language model deployments. Published by the OWASP GenAI Security Project, it's built from real-world incidents, researcher findings, and industry consensus

## The 2025 List With Component Mapping

> The table below doesn't just list the ten risks; it also shows where each risk lives in a typical LLM architecture

<table>
  <thead>
    <tr>
      <th>#</th>
      <th>Risk</th>
      <th>What It Means</th>
      <th>Where It Lives (Vulnerable Components)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>LLM01</strong></td>
      <td>Prompt Injection</td>
      <td>Attacker manipulates model behaviour through crafted inputs, direct or indirect</td>
      <td>
        <strong> LLM inference endpoint</strong>
        (direct injection via user input),
        <strong>vector database / RAG pipeline</strong>
        (indirect injection via retrieved content),
        <strong>any component that feeds text to the model</strong>
      </td>
    </tr>
    <tr>
      <td><strong>LLM02</strong></td>
      <td>Sensitive Information Disclosure</td>
      <td>Model outputs reveal PII, credentials, or proprietary data</td>
      <td>
        <strong> LLM inference endpoint</strong>
        (model memorisation), <strong>training pipeline</strong> (sensitive data in training set),
        <strong>system prompt</strong> (credentials or logic embedded in prompt)
      </td>
    </tr>
    <tr>
      <td><strong>LLM03</strong></td>
      <td>Supply Chain</td>
      <td>Compromised models, training data, plugins, or dependencies</td>
      <td>
        <strong>Training pipeline</strong> (third-party datasets, compromised base models, poisoned
        fine-tuning data),
        <strong> model registry </strong>
        (models retrieved from external repos such as Hugging Face),
        <strong>plugin/tool integrations</strong> (vulnerable or compromised third-party
        dependencies)
      </td>
    </tr>
    <tr>
      <td><strong>LLM04</strong></td>
      <td style="text-align: left">Data and Model Poisoning</td>
      <td>Corrupted training data or model weights alter behaviour</td>
      <td>
        <strong>Training pipeline</strong> (data injection point),
        <strong> model registry </strong>
        (model swap), <strong>feature store</strong> (manipulated input features)
      </td>
    </tr>
    <tr>
      <td><strong>LLM05</strong></td>
      <td>Improper Output Handling</td>
      <td>LLM outputs aren't validated before downstream use</td>
      <td>
        <strong>Web frontend</strong> (unsanitised output rendered in browser, XSS risk),
        <strong> API gateway</strong>
        (model output passed to downstream services without validation),
        <strong>any system consuming model responses</strong>
      </td>
    </tr>
    <tr>
      <td><strong>LLM06</strong></td>
      <td>Excessive Agency</td>
      <td>LLM granted too many permissions, tools, or autonomy</td>
      <td>
        <strong> LLM inference endpoint</strong>
        (where jailbreaking enables tool abuse), <strong>tool integrations</strong> (database query
        tools, code execution, email sending),
        <strong> API gateway</strong>
        (overly broad API permissions granted to the model), agentic orchestration layer
      </td>
    </tr>
    <tr>
      <td><strong>LLM07</strong></td>
      <td>System Prompt Leakage</td>
      <td>Internal prompts containing sensitive logic or credentials are exposed</td>
      <td>
        <strong> LLM inference endpoint</strong>
        (prompt extraction attacks), <strong>system prompt configuration</strong> (credentials or
        API keys stored in prompts rather than secure vaults)
      </td>
    </tr>
    <tr>
      <td><strong>LLM08</strong></td>
      <td>Vector and Embedding Weaknesses</td>
      <td>Vulnerabilities in RAG systems, vector databases, and embeddings</td>
      <td>
        <strong>Vector database</strong> ( embedding poisoning, similarity attacks, unauthorised
        access),
        <strong> RAG pipeline</strong>
        (retrieval manipulation),
        <strong> embedding generation process</strong>
      </td>
    </tr>
    <tr>
      <td><strong>LLM09</strong></td>
      <td>Misinformation</td>
      <td>LLM generates credible-sounding but false content</td>
      <td>
        <strong> LLM inference endpoint</strong>
        (hallucination), <strong>vector database</strong> (stale or incorrect source documents),
        <strong>any user-facing output channel</strong>
      </td>
    </tr>
    <tr>
      <td><strong>LLM10</strong></td>
      <td>Unbounded Consumption</td>
      <td>Uncontrolled resource usage leading to DoS or financial exploitation</td>
      <td>
        <strong> LLM inference endpoint</strong>
        (expensive queries, denial of wallet),
        <strong> API gateway</strong>
        (insufficient rate limiting), <strong>training pipeline</strong> (resource-heavy junk data
        injection)
      </td>
    </tr>
  </tbody>
</table>

## Reading the Table Like a Defender

> This table is designed to work in two directions:

- Risk -> Component
- Component -> Risk

> The second direction is what makes this table powerful in practice, when your organisation adds a new component to an AI deployment, you can immediately identify which OWASP risks it inherits like:

- `LLM Inference Endpoint` appears in seven of the ten OWASP entries
- `Vector Database / RAG Pipeline` appears in three entries
- `Training Pipeline` appears in three entries

## Connecting OWASP Back to STRIDE and ATLAS

> Think of it as zoom levels

- STRIDE gives you the wide-angle view
- ATLAS gives you the technical detail
- OWASP tells you where to point the camera

<table>
  <thead>
    <tr>
      <th>Layer</th>
      <th>What It Does</th>
      <th>When You Use It</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <strong> STRIDE- AI </strong>
      </td>
      <td>Categorises threats by type</td>
      <td>Initial threat identification, "what could go wrong"</td>
    </tr>
    <tr>
      <td>
        <strong> MITRE ATLAS </strong>
      </td>
      <td>Documents specific attack techniques</td>
      <td>Enrichment, "how exactly would an attacker do this"</td>
    </tr>
    <tr>
      <td>
        <strong> OWASP LLM Top 10</strong>
      </td>
      <td>Maps risks to components and prioritises</td>
      <td>Assessment and scoping, "where does this risk live and how critical is it"</td>
    </tr>
  </tbody>
</table>
