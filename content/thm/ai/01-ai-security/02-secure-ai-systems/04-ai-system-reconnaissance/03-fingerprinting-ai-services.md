# fingerprinting ai services

> need to figure out what is actually running behind each open port, this is where fingerprinting comes in

> Fingerprinting AI services requires a different approach; you need to look at:

- HTTP headers
- JSON response structures
- Error messages
- Endpoint naming conventions

> Each AI framework has its own distinct signature

## HTTP Header Fingerprinting

Response headers are often the fastest way to identify an AI framework. Many inference engines broadcast their identity unless an administrator specifically masks them behind a reverse proxy.

> **TorchServe** returns a `Server: TorchServe/0.x.x` header.

> **Triton Inference Server** includes a `NV-Status` header in its responses.

- send `endpoint-load-metrics-format: text`, triton returns hardware telemetry, no other framework does this

> **FastAPI-based ML** services show `server: uvicorn` in the response.

> **OpenAI-compatible** wrappers (vLLM, LiteLLM, Ollama) return `x-request-id` headers and structured JSON with an `"object": "model"` field on their `/v1/models` endpoint.

## API Response Signatures

Each framework returns distinctly structured JSON

> **TensorFlow Serving returns**: `{"model_version_status": [{"version": "1", "state": "AVAILABLE"}]}`

> **Triton returns**: {"name": "fraud_detector", "versions": ["1"], "platform": "tensorflow_graphdef"}

> **MLflow** error responses include stack traces referencing `mlflow.server` and `mlflow.tracking` namespaces.

> **OpenAI-compatible** endpoints return: `{"object": "model", "id": "llama-3.1-8b", "created": 1700000000}`

- `"object" : "model"` speaks the OpenAI API format, that narrows it down to vLLM, LiteLLM, Ollama, or a custom wrapper.

## Error Message Fingerprinting

This is one of the most reliable identification techniques, send a deliberately malformed payload and read the error response

> **TensorFlow Serving endpoint** that expects a complex tensor object, send a flat list of integers, and you get back an error mentioning `tensorinfo_map`

> **MLflow server**: send a bad request, and the stack trace references `mlflow.server`, `mlflow.tracking`, or databricks namespaces.

- **MLflow path traversal errors** (CVE-2024-1558) go further, exposing full server filesystem paths.

> `Databricks Mosaic AI` returns Java exceptions `io.jsonwebtoken.IncorrectClaimException` for malformed tokens

## Endpoint Naming Conventions

AI endpoints use computational action terms that stand out immediately during directory brute-forcing

> **Inference endpoints**: `/predict`, `/invocations` (the SageMaker convention), `/infer`, `/generate`, `/embeddings`, `/score`

> **Model management**: `/v1/models`, `/v2/models`

> **MLflow internal API**: `/api/2.0/mlflow/` (this prefix is distinctive and does not appear in any other framework)

> **Kubeflow pipelines**: `/pipeline/apis/v1beta1/`

## gRPC Fingerprinting

Many AI services expose gRPC alongside HTTP

> **Triton** uses gRPC on port `8001`

> **TensorFlow** Serving uses it on port `8500`

Traditional HTTP scanners miss gRPC, it does not respond to standard HTTP probes, the tool for this is `grpcurl`

- `grpcurl -plaintext target:8001 list`
- `grpcurl -plaintext target:8001 describe inference.GRPCInferenceService`

## TLS Fingerprinting (JA3/JA4)

AI deployments have distinctive TLS signatures, internal service-to-service traffic is dominated by Python libraries rather than web browsers.
JA3 and JA4 hash analysis can differentiate automated ML pipeline traffic from human web browsing at the network level.
