# Anatomy of an AI System

## From Traditional to AI-Augmented

> with AI new components appear, and data flows through paths that existing security controls were never designed to monitor

<table>
  <thead>
    <tr>
      <th>Component</th>
      <th>Traditional App</th>
      <th>AI-Augmented App</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>User input</strong></td>
      <td>Structured forms, API parameters</td>
      <td>Free-form natural language</td>
    </tr>
    <tr>
      <td><strong>Processing</strong></td>
      <td>Deterministic code</td>
      <td>Probabilistic model inference</td>
    </tr>
    <tr>
      <td><strong>Data access</strong></td>
      <td>Direct database queries</td>
      <td>Model-mediated retrieval (RAG)</td>
    </tr>
    <tr>
      <td><strong>Output</strong></td>
      <td>Template-rendered responses</td>
      <td>Generated natural language</td>
    </tr>
    <tr>
      <td><strong>Dependencies</strong></td>
      <td>Libraries, frameworks</td>
      <td>Libraries + pre-trained models + embeddings</td>
    </tr>
  </tbody>
</table>

> The shift from structured to unstructured input is the most consequential change. An AI system accepts any text the user chooses to type. That single change invalidates most existing input validation strategies.

## The TryAssist Architecture

<table>
  <thead>
    <tr>
      <th>Component</th>
      <th>Function</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>User Interface</strong></td>
      <td>Developer-facing chat widget embedded in the code review platform</td>
    </tr>
    <tr>
      <td>
        <strong>API Gateway</strong>
      </td>
      <td>Authentication, rate limiting, request routing</td>
    </tr>
    <tr>
      <td><strong>Orchestration Layer</strong></td>
      <td>Manages conversation state, routes requests, coordinates components</td>
    </tr>
    <tr>
      <td><strong>Prompt Construction</strong></td>
      <td>
        Combines the system prompt, user query, and retrieved context into the final prompt sent to
        the model
      </td>
    </tr>
    <tr>
      <td>
        <strong>LLM</strong>
      </td>
      <td>The language model (hosted internally or accessed via API) that generates responses</td>
    </tr>
    <tr>
      <td><strong>Tool Layer</strong></td>
      <td>
        Functions the LLM can invoke: database queries, documentation search, CI/CD status checks
      </td>
    </tr>
    <tr>
      <td><strong>Output Processing</strong></td>
      <td>Response formatting, content filtering, length enforcement</td>
    </tr>
    <tr>
      <td><strong>Logging and Monitoring</strong></td>
      <td>Conversation storage, usage analytics, audit trail</td>
    </tr>
    <tr>
      <td><strong>Vector Store</strong></td>
      <td>
        Embedded representations of internal documentation for retrieval-augmented generation (RAG)
      </td>
    </tr>
  </tbody>
</table>

## Trust Boundaries

> A trust boundary is where data moves from one security context to another, and every one is a potential attack surface

<table>
  <thead>
    <tr>
      <th>Boundary</th>
      <th>Data Crossing</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>User-to-system</strong></td>
      <td>Untrusted natural language enters the system</td>
    </tr>
    <tr>
      <td>
        <strong>System-to-LLM</strong>
      </td>
      <td>Constructed prompt (system instructions + user input + context) sent to the model</td>
    </tr>
    <tr>
      <td>
        <strong>LLM-to-tools</strong>
      </td>
      <td>Model output triggers database queries, API calls, or file operations</td>
    </tr>
    <tr>
      <td><strong>System-to-external-data</strong></td>
      <td>Retrieved documents from vector store or external sources enter the prompt</td>
    </tr>
    <tr>
      <td><strong>System-to-user</strong></td>
      <td>Generated response delivered to the user</td>
    </tr>
  </tbody>
</table>

## Data Flow: A Single Request

> Lets trace a single request through TryAssist:

1. A developer types: "Does this pull request handle authentication correctly?"
2. The API gateway authenticates the request and applies rate limits
3. The orchestration layer retrieves conversation history and routes the request
4. The prompt construction layer combines the system prompt ("You are a secure code review assistant..."), the user's question, and relevant documentation retrieved from the vector store
5. The assembled prompt is sent to the LLM, which generates a response
6. The LLM's response may include a request to invoke a tool (e.g., "fetch the latest CI pipeline status for this PR")
7. The tool layer executes the action and returns the result to the LLM
8. The LLM generates a final response incorporating the tool result
9. Output processing applies content filters and formats the response
10. The response is delivered to the developer and the entire exchange is written to the logging system

> Every numbered step crosses at least one trust boundary. The question is: which boundaries have security controls, and which are unprotected?
