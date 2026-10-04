# Enumerating AI Systems

## MLflow Enumeration

MLflow stores everything in one place and exposes it through a clean REST API

> Step 1: List all experiments

`POST /api/2.0/mlflow/experiments/search`

- returns every experiment on the server with its name and internal ID, often reveal project codenames and business objectives: `fraud-detection-v3`, `rag-embeddings-tuning`, `customer-churn-prototype`.

> Step 2: List registered models

`GET /api/2.0/mlflow/registered-models/list`

- returns every model the organisation has built and registered, names, descriptions, and creation timestamps

> Step 3: Get model version details

`GET /api/2.0/mlflow/model-versions/search`

- The response includes the `source` field, which contains the artifact URI
- That URI frequently points to internal cloud storage: `s3://internal-ml-models-corp/experiments/1/artifacts/` or a similar path
- It also includes the `user_id` of the data scientist who created each version, creation timestamps, and stage labels showing which models are in production versus staging

> Step 4: Search training runs

`POST /api/2.0/mlflow/runs/search`

- this returns hyperparameters, training metrics, and custom tags
- Teams use them for internal project codenames, Git commit hashes that link back to proprietary source code, and deployment environment identifiers

> Step 5: List downloadable artifacts

`GET /api/2.0/mlflow/artifacts/list`

- This lists the actual model files available for download

## Inference Server Metadata

> **Triton** and **TensorFlow Serving** both expose metadata endpoints

- On **Triton** `GET /v2/models/<name>/config` the response includes input tensor names, their multi-dimensional shapes, accepted data types, maximum batch size, and the backend framework

- On **TensorFlow Serving** `GET /v1/models/<name>/metadata` returns the same kind of input/output tensor specifications, shape, dtype, and name for every input and output the model expects

## Vector Database Enumeration

Vector databases reveal what data the AI system is working with and which embedding model processes it

> **Weaviate**

- `GET /v1/meta` returns the server version and installed modules
- `GET /v1/schema` returns every class definition, including property names and the vectoriser module configuration
- `/v1/graphql` for full schema introspection and data querying on unauthenticated instances

> **Qdrant**

- `GET /collections` it lists all collection names
- `GET /collections/<name>` returns vector dimensions, the distance metric, and the total point count
- A collection named `internal-hr-policies` with 768-dimensional vectors and 50,000 points tells you a lot about what that RAG system indexes

> **Chroma**

- older versions expose `GET /api/v1/collections` without authentication by default

## Prometheus Metrics as Intelligence

> Model servers often expose `/metrics` on a dedicated port (Triton on 8002, TorchServe on 8082)

- Model names and version numbers currently loaded
- Inference request counts and latency percentiles
- Batch sizes being processed
- GPU memory utilisation per model

This is passive intelligence, learn the deployment topology, without sending a single request to the inference API itself

## Debug Interfaces and Information Leakage

> **FastAPI-based ML services** auto-generate `/docs` (Swagger UI) and `/openapi.json`

- Both expose the full request/response schema, authentication requirements, and example payloads for every endpoint

> **MLflow's GraphQL** endpoint `/graphql` has historically bypassed the REST API's authentication controls

- An unauthenticated attacker could query internal resolvers like `mlflowSearchRuns` and `mlflowGetRun`, extracting host machine usernames, source code paths via `mlflow.source.name` tags, and the full project inventory
- Appending `?debug=true` or `?verbose=1` to AI gateway endpoints can trigger raw stack traces that reveal filesystem paths, installed library versions, and, occasionally, hardcoded credentials that failed to load from environment variables

## Jupyter Notebook Enumeration

- `GET /api/kernels` on an unauthenticated Jupyter instance returns the names, kernel IDs, and last activity timestamps of running kernels
- Data scientists routinely store cleartext credentials for MLflow (`MLFLOW_TRACKING_USERNAME`, `MLFLOW_TRACKING_PASSWORD`), cloud storage access keys, and Hugging Face tokens directly in their code

## question prompt

```
jupyter nbconvert --to script rag_pipeline_debug.ipynb
grep -niE "mlflow|password|secret|token|auth" rag_pipeline_debug.py
```
