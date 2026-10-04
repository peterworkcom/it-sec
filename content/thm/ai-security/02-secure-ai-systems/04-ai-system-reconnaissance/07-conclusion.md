# conclusion

## MITRE ATLAS (Adversarial Threat Landscape for AI Systems)

> ATLAS is the primary framework for AI-specific threats.

<table>
  <thead>
    <tr>
      <th>Room Content</th>
      <th>ATLAS Technique ID</th>
      <th>Technique Name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Shodan and GitHub dorks for AI infrastructure</td>
      <td>AML.T0000</td>
      <td>Active Scanning</td>
    </tr>
    <tr>
      <td>Locating model registries and artifacts through unsecured APIs</td>
      <td>AML.T0048</td>
      <td>Discover ML Artifacts</td>
    </tr>
    <tr>
      <td>Finding exposed HF tokens and dependency confusion</td>
      <td>AML.T0040</td>
      <td>ML Supply Chain Compromise</td>
    </tr>
    <tr>
      <td>Enumerating LLM configs and API schema compatibility</td>
      <td>AML.T0069</td>
      <td>Discover LLM System Information</td>
    </tr>
    <tr>
      <td>All reconnaissance activities collectively</td>
      <td>AML.TA0002</td>
      <td>Reconnaissance (Tactic)</td>
    </tr>
  </tbody>
</table>

## MITRE ATT&CK (Enterprise)

Traditional ATT&CK techniques also apply because AI reconnaissance uses many of the same methods as conventional network assessment.

<table>
  <thead>
    <tr>
      <th>Room Content</th>
      <th>ATT&amp;CK Technique ID</th>
      <th>Technique Name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Port scanning for AI-specific services</td>
      <td>T1046</td>
      <td>Network Service Scanning</td>
    </tr>
    <tr>
      <td>Extracting deployment topology from metrics and metadata</td>
      <td>T1592</td>
      <td>Gather Victim Host Information</td>
    </tr>
    <tr>
      <td>Probing for unauthenticated management interfaces</td>
      <td>T1595.002</td>
      <td>Vulnerability Scanning</td>
    </tr>
    <tr>
      <td>Collecting AI infrastructure intelligence before engagement</td>
      <td>TA0043</td>
      <td>Reconnaissance (Tactic)</td>
    </tr>
  </tbody>
</table>

## OWASP Top 10 for LLM Applications (2025)

Several OWASP LLM risks directly relate to findings

<table>
  <thead>
    <tr>
      <th>Room Finding</th>
      <th>OWASP LLM ID</th>
      <th>Risk Name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Exposed MLflow servers, Jupyter notebooks, unauthenticated APIs</td>
      <td>LLM05</td>
      <td>
        Improper Output Handling (relates to exposed metadata and information leakage through API
        responses)
      </td>
    </tr>
    <tr>
      <td>Model artifacts downloadable from unsecured registries</td>
      <td>LLM06</td>
      <td>Excessive Agency (relates to model access without proper authorisation controls)</td>
    </tr>
    <tr>
      <td>Leaked HF tokens, dependency confusion, poisoned model files from public hubs</td>
      <td>LLM03</td>
      <td>Training Data Poisoning / Supply Chain Vulnerabilities</td>
    </tr>
    <tr>
      <td>Default credentials, missing authentication on MLflow and Kubeflow</td>
      <td>LLM10</td>
      <td>Model Theft (reconnaissance enables direct model exfiltration)</td>
    </tr>
  </tbody>
</table>

## NIST AI Risk Management Framework (AI RMF 1.0)

> NIST AI RMF organises AI risk into four functions: Govern, Map, Measure, and Manage. This room's content falls primarily under the Map function:

- **Map 1.1**: AI system components and their interactions are identified. This is exactly what Tasks 2 through 4 accomplish. You cannot assess risk in AI infrastructure you have not discovered.

- **Map 1.5**: Potential risks of the AI system are assessed. The attack surface mapping in Task 5 directly supports this. Identifying misconfigurations, exposed registries, and supply chain risks is risk assessment at the infrastructure layer.

- **Map 3.2**: Risks related to third-party AI resources are identified. The supply chain reconnaissance in Task 5 (Hugging Face tokens, PyTorch Hub dependencies, public model registries) maps here.

- **Measure 2.6**: Processes exist to determine whether AI systems are functioning as intended. The Prometheus metrics and debug interface enumeration from Task 4 support this, as unexpected exposed endpoints indicate systems not functioning as intended from a security perspective.

## NIST Cybersecurity Framework (CSF 2.0)

> The room's content aligns with CSF 2.0's Identify function:

- **ID.AM (Asset Management)**: Discovering and inventorying AI infrastructure components across the network. This is the core purpose of the entire room.

- **ID.RA (Risk Assessment)**: Mapping the AI attack surface and identifying misconfigurations that introduce risk.
