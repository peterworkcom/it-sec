# AI Attack Surface Mapping - Condensed Notes

Earlier tasks produced individual findings: AI components identified, frameworks fingerprinted, API metadata extracted. This task connects them. A list of findings becomes an attack surface map only through the relationships between them.

## How AI Expands the Attack Surface

- 14 AI components across 20+ ports, vs. 5 ports for a traditional web app.
- Port count isn't the point - these services constantly talk to each other:
  - Inference server -> vector DB (feature pulls)
  - Orchestration platform -> model registry (model pushes)
  - Jupyter -> everything
  - Prometheus -> scrapes all services
- One component bound to `0.0.0.0` instead of `127.0.0.1` exposes the entire internal mesh.
- **The perimeter is internal.** Permissive network policies and missing mTLS between data-hungry components are the norm.

## Platform Misconfigurations

### MLflow

- No authentication by default before v2.x.
- **CVE-2026-2635** (CVSS 9.8) - hardcoded default credentials in `basic_auth.ini`; mass scans of port 5000 authenticate with defaults.
- **CVE-2026-2033** (CVSS 9.8) - directory traversal in the artifact handler -> unauthenticated RCE.

### Kubeflow

- Frequently deployed without OIDC, exposed via LoadBalancer or NodePort.
- Unauthenticated access to the dashboard allows spawning Jupyter notebooks bound to Kubernetes service accounts with cluster-level permissions -> open dashboard to container orchestration access.

### TorchServe

- Management API on port 8081 permits dynamic model registration from arbitrary URLs.
- Attacker instructs the server to fetch a malicious `.mar` archive; initialisation code runs at load time -> RCE.

### SageMaker

- Notebooks with `DirectInternetAccess: Enabled` accept inbound internet connections.
- A 2024 cloud security report found 82% of SageMaker orgs had at least one such notebook.

## Model Registries: Highest-Value Target

A registry stores lineage, not just model files:

- Model names, version history, stage labels (staging / production / archived)
- Creation timestamps
- Run IDs -> full training metadata
- Artifact URIs -> internal cloud storage paths
- Contributor user IDs

One open registry maps the entire ML product portfolio. IBM X-Force documented the pattern:

1. Attacker finds MLflow credentials in a Jupyter notebook
2. Runs MLOKit against the registry
3. Exfiltrates every model artifact

The registry is the map to where everything else is stored.

## Supply Chain Reconnaissance

**Hugging Face tokens** - discoverable via dorks (`filename:.env HF_TOKEN`), and present in `.env` files, CI/CD logs, and Kubernetes secrets. A compromised token grants read/write to the org's private models and datasets.

**Dependency confusion** - large `requirements.txt` files expose internal package names. An unregistered internal name (e.g. `company-data-utils`) can be claimed on PyPI. Kubeflow pipelines that build containers at training time pull live, so a typosquatted package executes inside the training cluster.

**Model download sources** - HF Hub / PyTorch Hub paths are visible in config files, notebook cells, and container build logs. Injecting a malicious model upstream (or replacing one via a stolen HF token) poisons the whole supply chain.

## MITRE ATLAS Mapping

ATLAS mirrors ATT&CK but covers adversarial threats to AI/ML systems: 15 tactics, 66 techniques, 46 sub-techniques (as of late 2025).

| Room Content                                                  | ATLAS Technique                        |
| ------------------------------------------------------------- | -------------------------------------- |
| Port scanning for AI services, probing endpoints              | AML.T0006 - Active Scanning            |
| Locating registries and training artifacts via unsecured APIs | AML.T0007 - Discover ML Artifacts      |
| Finding exposed HF tokens and poisoned dependencies           | AML.T0010 - ML Supply Chain Compromise |
| Enumerating LLM configs and API compatibility                 | AML.T0014 - Discover ML Model Family   |
| All of the above, collectively                                | AML.TA0002 - Reconnaissance tactic     |

Mapping findings to technique IDs in a report gives readers a shared vocabulary for what was done and what risk it represents.
