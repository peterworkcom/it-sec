# The AI Infrastructure Stack

> A production AI system is not a single server. It is a collection of specialised services that handle different parts of the machine learning lifecycle. Here is what you will encounter during reconnaissance.

## Model Serving Endpoints

> These are the frameworks that load trained models into memory and expose prediction APIs. They are the front door of any AI deployment.

## Orchestration and Experiment Tracking

> These platforms manage the entire ML lifecycle, from experiment design through to model deployment. They are the highest-value targets during reconnaissance because they contain everything.

## Vector Databases

> These store embeddings (numerical representations of documents) and power semantic search for RAG pipelines. If an organisation has an AI chatbot or knowledge assistant, there is almost certainly a vector database behind it.

## Model Registries

> A model registry stores the actual model files. Serialised .pkl, .pt, .onnx, and .mar files, along with version history, stage transitions (staging, production, archived), artifact URIs pointing to cloud storage, and the identity of who created each version. An unsecured registry is the single highest-value reconnaissance target. It maps the organisation's entire ML product portfolio in one place.

## Supporting Infrastructure

- Jupyter notebooks (port 8888) often run with --ip=0.0.0.0 and no authentication. That gives direct terminal access to anyone who reaches the port. Data scientists also routinely store cleartext credentials in notebook cells.
- MinIO (ports 9000 and 9001) provides S3-compatible object storage for model artifacts. Bucket listing is frequently enabled.
- Prometheus metrics endpoints on model servers (Triton on 8002, TorchServe on 8082) leak model names, batch sizes, GPU utilisation, and inference latency. You can map the entire deployment topology without ever touching the inference API.

## Port and Protocol Reference

<table>
  <tbody>
    <tr>
      <td><strong>Component</strong></td>
      <td><strong>Default Port(s)</strong></td>
      <td><strong>Protocol(s)</strong></td>
      <td><strong>Recon Endpoints</strong></td>
    </tr>
    <tr>
      <td>
        NVIDIA Triton<br /><em>(Loads models into memory and serves predictions at scale)</em>
      </td>
      <td>8000, 8001, 8002</td>
      <td>HTTP, gRPC, Prometheus</td>
      <td>/v2/health/ready,&nbsp;/v2/models</td>
    </tr>
    <tr>
      <td>
        TensorFlow Serving<br /><em>(Google's model serving framework for TensorFlow models)</em>
      </td>
      <td>8500, 8501</td>
      <td>gRPC, HTTP</td>
      <td>/v1/models/&lt;name&gt;</td>
    </tr>
    <tr>
      <td>TorchServe<br />(<em>PyTorch's official model serving framework</em>)</td>
      <td>8080, 8081, 8082</td>
      <td>HTTP</td>
      <td>/ping, /models</td>
    </tr>
    <tr>
      <td>Ollama<br />(<em>Local runtime for running LLMs on your own hardware</em>)</td>
      <td>11434</td>
      <td>HTTP</td>
      <td>/api/tags, /api/show</td>
    </tr>
    <tr>
      <td>vLLM <br /><em>(High-throughput LLM serving engine with OpenAI-compatible API)</em></td>
      <td>8000</td>
      <td>HTTP</td>
      <td>/v1/models</td>
    </tr>
    <tr>
      <td>
        MLflow <br /><em>(Tracks experiments, stores models, and manages the ML lifecycle)</em>
      </td>
      <td>5000</td>
      <td>HTTP</td>
      <td>/api/2.0/mlflow/experiments/search</td>
    </tr>
    <tr>
      <td>Kubeflow<br /><em>(Kubernetes-native platform for orchestrating ML pipelines)</em></td>
      <td>80, 443</td>
      <td>HTTP</td>
      <td>/pipeline/apis/v1beta1/pipelines</td>
    </tr>
    <tr>
      <td>Ray<br /><em>(Distributed compute framework for scaling AI workloads)</em></td>
      <td>8265, 8000</td>
      <td>HTTP</td>
      <td>/api/jobs/, Ray Dashboard</td>
    </tr>
    <tr>
      <td>Qdrant<br />(<em>Vector database for semantic search and RAG pipelines</em>)</td>
      <td>6333, 6334</td>
      <td>HTTP, gRPC</td>
      <td>/collections</td>
    </tr>
    <tr>
      <td>Weaviate<br /><em>(Vector database with built-in GraphQL and module system)</em></td>
      <td>8080</td>
      <td>HTTP, GraphQL</td>
      <td>/v1/schema, /v1/meta</td>
    </tr>
    <tr>
      <td>Milvus<br />(<em>Distributed vector database for large-scale embedding storage</em>)</td>
      <td>19530</td>
      <td>gRPC</td>
      <td>Port 19530 connection</td>
    </tr>
    <tr>
      <td>
        Jupyter Notebook<br /><em>(Interactive coding environment used by data scientists)</em>
      </td>
      <td>8888</td>
      <td>HTTP</td>
      <td>/api/kernels, /api/contents</td>
    </tr>
    <tr>
      <td>MinIO<br /><em>(S3-compatible object storage often used for model artifacts)</em></td>
      <td>9000, 9001</td>
      <td>HTTP (S3-compatible)</td>
      <td>Bucket listing</td>
    </tr>
    <tr>
      <td>
        Prometheus metrics <br /><em
          >(Not a standalone AI service; exposed by Triton on 8002, TorchServe on 8082, and other ML
          servers as a built-in monitoring endpoint)</em
        >
      </td>
      <td>8002, 8082</td>
      <td>HTTP</td>
      <td>/metrics</td>
    </tr>
  </tbody>
</table>
