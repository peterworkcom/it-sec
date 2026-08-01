# Adapting STRIDE for AI Systems

## STRIDE (traditional)

<table>
  <thead>
    <tr>
      <th>Threat Category</th>
      <th>Security Property Violated</th>
      <th>Traditional Meaning</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>S</strong> — Spoofing</td>
      <td>Authenticity</td>
      <td>Pretending to be someone or something you're not</td>
    </tr>
    <tr>
      <td><strong>T</strong> — Tampering</td>
      <td>Integrity</td>
      <td>Modifying data or code without authorisation</td>
    </tr>
    <tr>
      <td><strong>R</strong> — Repudiation</td>
      <td>Non-repudiability</td>
      <td>Denying that you performed an action</td>
    </tr>
    <tr>
      <td><strong>I</strong> — Information Disclosure</td>
      <td>Confidentiality</td>
      <td>Exposing information to unauthorised parties</td>
    </tr>
    <tr>
      <td><strong>D</strong> — Denial of Service</td>
      <td>Availability</td>
      <td>Making a system or resource unavailable</td>
    </tr>
    <tr>
      <td><strong>E</strong> — Elevation of Privilege</td>
      <td>Authorisation</td>
      <td>Gaining access or capabilities beyond what's permitted</td>
    </tr>
  </tbody>
</table>

## STRIDE-AI Consolidated Mapping

<table>
  <thead>
    <tr>
      <th>STRIDE Category</th>
      <th>Primary AI Manifestation</th>
      <th>Other AI Threats</th>
      <th>MegaCorp Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Spoofing</strong></td>
      <td>Data source impersonation ( RAG injection)</td>
      <td>Model impersonation, adversarial identity attacks</td>
      <td>Fake policy docs injected into chatbot knowledge base</td>
    </tr>
    <tr>
      <td><strong>Tampering</strong></td>
      <td>Data poisoning</td>
      <td>Model manipulation, prompt injection, feature tampering</td>
      <td>Crafted transactions shift fraud model's decision boundaries</td>
    </tr>
    <tr>
      <td><strong>Repudiation</strong></td>
      <td>Lack of decision audit trails</td>
      <td>Context volatility, model version ambiguity</td>
      <td>Can't explain why fraud model approved a suspicious transaction</td>
    </tr>
    <tr>
      <td><strong>Info Disclosure</strong></td>
      <td>Model extraction / stealing</td>
      <td>Training data extraction, prompt leakage, embedding inversion</td>
      <td>Competitor reconstructs recommendation engine via API queries</td>
    </tr>
    <tr>
      <td><strong>Denial of Service</strong></td>
      <td>Inference cost exploitation (denial of wallet)</td>
      <td>GPU exhaustion, sponge examples, pipeline disruption</td>
      <td>Chatbot API flooded with expensive prompts; bill ($) spikes 12x</td>
    </tr>
    <tr>
      <td><strong>Elevation of Privilege</strong></td>
      <td>Jailbreaking / guardrail bypass</td>
      <td>Excessive agency, tool exploitation, cross-plugin escalation</td>
      <td>Jailbroken chatbot used to query customer PII via database tools</td>
    </tr>
  </tbody>
</table>
