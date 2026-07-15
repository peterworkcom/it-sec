# The AI Attack Surface

## OWASP LLM Top 10 (2025)

> The OWASP LLM Top 10 (2025) classifies the ten most critical vulnerabilities in LLM applications. Not all ten are equally relevant to a pre-deployment architecture review. Five of the ten operate at the system architecture level: they emerge from how an AI system is built and integrated, not from the model's internal behavior

<table>
  <thead>
    <tr>
      <th>Risk</th>
      <th>Category</th>
      <th>Description</th>
      <th>Covered In</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>LLM01</strong></td>
      <td>Prompt Injection</td>
      <td>Manipulating LLM behaviour through crafted inputs</td>
      <td>
        <a href="https://tryhackme.com/module/prompt-security" target="_blank"
          >Prompt Security Module</a
        >
      </td>
    </tr>
    <tr>
      <td><strong>LLM02</strong></td>
      <td>Sensitive Information Disclosure</td>
      <td>Leaking confidential data, PII, or system details through responses</td>
      <td>
        <strong>This room</strong> +
        <a href="https://tryhackme.com/module/data-poisoning" target="_blank">
          Data Poisoning Module</a
        >
      </td>
    </tr>
    <tr>
      <td><strong>LLM03</strong></td>
      <td>Supply Chain</td>
      <td>
        Compromised pre-trained models, datasets, and third-party dependencies introduced before
        deployment
      </td>
      <td>
        <a href="https://tryhackme.com/module/ai-supply-chain-security" target="_blank">
          AI Supply Chain Security Module</a
        >
      </td>
    </tr>
    <tr>
      <td><strong>LLM04</strong></td>
      <td>Data and Model Poisoning</td>
      <td>Corrupting training data or model weights to alter behaviour</td>
      <td>
        <a href="https://tryhackme.com/module/data-poisoning" target="_blank">
          Data Poisoning Module</a
        >
      </td>
    </tr>
    <tr>
      <td><strong>LLM05</strong></td>
      <td>Improper Output Handling</td>
      <td>LLM output is causing injection in the downstream systems</td>
      <td><strong>This room</strong></td>
    </tr>
    <tr>
      <td><strong>LLM06</strong></td>
      <td>Excessive Agency</td>
      <td>AI components with more privilege or autonomy than necessary</td>
      <td><strong>This room</strong></td>
    </tr>
    <tr>
      <td><strong>LLM07</strong></td>
      <td>System Prompt Leakage</td>
      <td>Exposure of system-level instructions and internal configuration</td>
      <td><strong>This room</strong></td>
    </tr>
    <tr>
      <td><strong>LLM08</strong></td>
      <td>Vector and Embedding Weaknesses</td>
      <td>Exploiting retrieval mechanisms and embedding pipelines</td>
      <td>
        <a href="https://tryhackme.com/module/data-poisoning" target="_blank">
          Data Poisoning Module</a
        >
      </td>
    </tr>
    <tr>
      <td><strong>LLM09</strong></td>
      <td>Misinformation</td>
      <td>LLM generating false or misleading content</td>
      <td>
        <a href="https://tryhackme.com/room/llmsecurity" target="_blank"> LLM Security Room</a>
        in this module
      </td>
    </tr>
    <tr>
      <td><strong>LLM10</strong></td>
      <td>Unbounded Consumption</td>
      <td>Resource exhaustion, cost explosion, denial of service</td>
      <td><strong>This room</strong></td>
    </tr>
  </tbody>
</table>

> The five categories marked `This room` all trace back to architectural decisions made when TryAssist was designed

## MITRE ATLAS

> MITRE ATLAS (Adversarial Threat Landscape for AI Systems) is a knowledge base of adversary tactics, techniques, and case studies for AI systems, structured as a counterpart to MITRE ATT&CK

- OWASP classifies what the vulnerabilities are. ATLAS documents how adversaries exploit them.

- ATLAS follows the adversary's progression through a target.

- An attacker begins with reconnaissance, learning what model the system uses and how it is exposed.

- They gain initial access by compromising a supply chain component or exploiting an input vector.

- They achieve execution through techniques like prompt injection, adversarial inputs, or model tampering. Where persistence is needed, they implant backdoors in model weights. The end goal is impact: data exfiltration, service disruption, or silent manipulation of model outputs.

> ATLAS covers over 50 techniques across more than a dozen tactics, each with real-world case studies, and is updated as new attack patterns emerge.

## NIST AI Risk Management Framework

> The NIST AI RMF approaches the problem from an organisational perspective. Its four functions describe how an organisation manages AI risk systematically

- Govern (setting policies and accountability structures)
- Map (identifying AI systems and their risk contexts)
- Measure (assessing and monitoring risk levels)
- Manage (responding to and mitigating identified risks)

> Where OWASP names the vulnerabilities, and ATLAS describes how adversaries exploit them, the NIST AI RMF asks whether the organisation has a repeatable process for addressing them.

- Its companion, NIST AI 100-2 (published January 2025), provides a technical catalogue of adversarial ML techniques and mitigations across the full model lifecycle.
