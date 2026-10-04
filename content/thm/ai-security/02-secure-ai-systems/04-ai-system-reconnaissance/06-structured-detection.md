# AI Infrastructure Reconnaissance - Methodology & Detection

_Capstone task summary - TryHackMe AI Recon room_

This task consolidates the techniques from the previous four tasks into a single repeatable methodology for AI infrastructure pentesting, then flips perspective to show what that activity looks like to a defender in SIEM logs.

## The 5-Phase AI Reconnaissance Methodology

### Phase 1 - Passive Reconnaissance

See what's already publicly visible before touching the target network.

- Search **Shodan / Censys / FOFA** for AI service banners on the org's IP ranges. Example dorks:
  - `port:5000 "MLflow"`
  - `port:8888 title:"Home Page - Select or create a notebook"`
  - `http.title:"Ray Dashboard"`
- Search **GitHub** for leaked credentials and configs:
  - `filename:.env MLFLOW_TRACKING_URI`
  - `filename:.env HF_TOKEN`
  - `filename:config.json model_name site:github.com`
- Check **arXiv and engineering blogs** for published model architectures (maps to ATLAS technique **AML.T0000** - _Search for Victim's Publicly Available Research Materials_).
- Check **DockerHub / GitHub Container Registry** for org-named ML images (often contain hardcoded configs).
- Review **job postings** - e.g. "MLflow Administrator" or "Kubeflow Platform Engineer" reveals what's deployed.

### Phase 2 - Active Scanning

Target AI-specific ports directly.

```bash
nmap -p 5000,6333,8000,8001,8002,8080,8265,8500,8501,8888,9000,11434,19530 \
  -sV --script=http-title,http-headers <target>
```

- Follow up on **gRPC services** (ports 8001, 8500) with `grpcurl` - Nmap may report them as generic.
- Check for **Prometheus `/metrics` endpoints** on every service (often on separate ports like 8002 for Triton, 8082 for TorchServe). These leak deployment topology.

### Phase 3 - API Fingerprinting

Fuzz every discovered HTTP service with an AI-specific wordlist (`ffuf` / `feroxbuster`):

```
/v1/models
/v2/models
/v2/health/ready
/api/2.0/mlflow/experiments/list
/api/2.0/mlflow/registered-models/list
/pipeline/apis/v1beta1/pipelines
/api/serve/deployments/
/v1/schema
/v1/meta
/api/kernels
/api/contents
/openapi.json
/docs
/graphql
/metrics
/api/tags
/api/show
/collections
/healthz
/ping
```

For each endpoint returning **200**, apply fingerprinting: check response headers, parse JSON structure, and inspect error messages from malformed requests.

### Phase 4 - Metadata Extraction

Enumerate every confirmed AI service.

- **MLflow:** experiments, registered models, model versions (artifact URIs + user IDs), training runs, artifact listings - five API calls map the entire ML portfolio.
- **Triton / TF Serving:** model config endpoints for tensor specs and framework identification.
- **Vector databases:** schema and collection endpoints for data types and embedding models.
- **Jupyter:** kernel listings and notebook cell contents (often cleartext credentials).

### Phase 5 - Supply Chain Review

- Identify model download sources in configs, notebooks, and container build logs.
- Check whether internal artifact buckets (**S3 / GCS / MinIO**) are publicly readable.
- Audit `requirements.txt` / `Pipfile` for internal package names that could be **typosquatted** on PyPI.
- Check container registries for image pull access **without credentials**.

## Tool Reference

| Tool                      | What It Does                                                           | Phase |
| ------------------------- | ---------------------------------------------------------------------- | ----- |
| Shodan / Censys / FOFA    | Internet-wide search for AI service banners                            | 1     |
| GitHub search (dorks)     | Find leaked credentials/configs in public repos                        | 1     |
| Nmap (+ NSE scripts)      | Port discovery and service version detection                           | 2     |
| grpcurl                   | Interact with gRPC services, dump protobuf schemas if reflection is on | 2     |
| ffuf / feroxbuster        | Directory brute-forcing with AI-specific wordlists                     | 2, 3  |
| curl                      | Manual HTTP probing, header analysis, error triggering                 | 3, 4  |
| MLOKit (IBM X-Force Red)  | Automated MLflow enumeration and model exfiltration                    | 4     |
| Nuclei (ProjectDiscovery) | Template-based scanning for known AI misconfigurations                 | 2, 3  |
| Agrus Scanner             | Shadow AI detection with 50+ AI probes across all 65,535 ports         | 2     |

## What Your Recon Looks Like From the Other Side

Every technique above leaves a signature in logs. Understanding the defender's view makes you better at both attack and defence.

- **Model enumeration:** a burst of sequential `GET /v2/models` from one IP - 10–50 requests to the same endpoint within seconds.
- **Scripted MLflow access:** calls to `/registered-models/list` and `/model-versions/search` without UI session cookies - the exact pattern **MLOKit** produces.
- **Prometheus scraping:** `/metrics` requests from IPs outside the known monitoring CIDR.
- **AI-aware port scanning:** sequential hits on 5000, 8000, 8001, 8080, 8265, 8888 from one source - the Phase 2 Nmap command.
- **Path traversal on MLflow artifacts:** requests containing `../` or `%2e%2e%2f` - probing for **CVE-2026-2033**.
- **Jupyter access without a session:** `/api/kernels` and `/api/contents` requests with no valid session cookie.

## Quick Wins for Reducing Recon Surface

High-impact changes you can make today (not a full hardening guide):

- **Enable MLflow authentication** - set `MLFLOW_TRACKING_USERNAME` / `MLFLOW_TRACKING_PASSWORD`, or use an authenticating reverse proxy.
- **Lock down Jupyter** - disable `--allow-root` and `--ip=0.0.0.0` in production, require token auth, never bind to `0.0.0.0` without VPN/ingress auth.
- **Block AI ports at the perimeter** - 5000, 8000–8002, 8080, 8265, 8500/8501, 8888, 9000 should never be internet-facing without intent.
- **Disable Triton's model control endpoint** - `--model-control-mode none` in production.
- **Restrict Prometheus `/metrics`** to your internal monitoring CIDR (Triton 8002, TorchServe 8082 expose model names, GPU utilisation, batch sizes, topology).
- **Scope Hugging Face tokens** - fine-grained, read-only, minimal scope.
- **Strip debug headers and verbose errors** from ML responses before they reach untrusted networks.
- **Audit MinIO / S3 bucket policies** - model weights should never be in publicly readable buckets.

_Deeper mitigation is covered in the AI Threat Modelling Assessment room._
