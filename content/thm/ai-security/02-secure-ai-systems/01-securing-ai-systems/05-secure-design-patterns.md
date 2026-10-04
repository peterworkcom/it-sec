# secure design patterns

> more costly is security is added to the ML after deployment, better if it was applied during the design stage, a layered approach applies controls at every point, so that a failure at one layer does not compromise the whole system

## Defence in Depth for AI Systems

> layers to control every trust boundary

user (input) -> `input validation` -> `prompt hardening` -> `least privilege` -> `output sanitization` -> `MLSecOps`

| Boundary                | Controls                                                                                             |
| ----------------------- | ---------------------------------------------------------------------------------------------------- |
| User-to-system          | Input length validation, rate limiting, content filtering, and authentication                        |
| System-to-LLM           | Prompt injection detection, system prompt hardening, context size limits                             |
| LLM-to-tools            | Parameterised queries, least-privilege tool permissions, and approval workflows for write operations |
| System-to-external-data | Source validation for retrieved documents, content sanitisation before inclusion in prompts          |
| System-to-user          | Output sanitisation, PII redaction, response length limits, and content safety filters               |

| Threat                          | Primary Control                                                 |
| ------------------------------- | --------------------------------------------------------------- |
| LLM10 Unbounded Consumption     | Rate limiting and input length validation at User-to-system     |
| LLM07 System Prompt Leakage     | System prompt hardening at System-to-LLM boundary               |
| LLM05 Improper Output Handling  | Output validation and parameterised queries at LLM-to-tools     |
| LLM06 Excessive Agency          | Least-privilege tool permissions, approval workflows for writes |
| LLM02 Sensitive Info Disclosure | PII redaction and encrypted storage at Logging                  |

> Each layer reduces the chance that an attack succeeds end-to-end

## Least Privilege for AI Components

> Every tool the LLM can access should have the minimum permissions needed for its job

- `Database access`: Read-only by default. Write permissions require explicit justification for each specific operation
- `API tokens`: Scoped to the exact endpoints the tool needs, never use admin or root-level tokens
- `Tool allowlisting`: The LLM can only invoke functions that have been explicitly registered, any attempt to call an unregistered function is blocked and logged
- `Human-in-the-loop`: Any operation that modifies state (deploying code, updating records, sending communications) requires human approval before execution

## Input and Output Validation

- At the input boundary, enforce length limits and flag known injection patterns before the request reaches the orchestration layer
- At the output boundary, never pass raw LLM-generated text directly into a database query, shell command, or HTML template
- Extract only the structured data you expect and discard the rest
- Where possible, constrain the model to produce output in a defined schema, which limits what it can express and shrinks the injection surface

## Monitoring and Observability

> Security controls prevent attacks but monitoring catches the ones that get through

| What to Monitor                   | Why                                                                  |
| --------------------------------- | -------------------------------------------------------------------- |
| Request patterns                  | Detect automated probing, concurrent storms, or unusual usage spikes |
| Token consumption                 | Identify cost explosion attacks and runaway processes                |
| Tool invocations                  | Flag unexpected tool calls, especially write operations              |
| Response anomalies                | Detect sudden changes in response length, tone, or content           |
| System prompt extraction attempts | Log and alert on inputs that resemble known extraction techniques    |
| Cost metrics                      | Set budget alerts and automatic circuit breakers                     |

## MLSecOps

> `MLSecOps` is the practice of integrating security throughout the machine learning lifecycle, from development and testing through deployment and live operations, it applies the shift-left principle to AI

- security decisions are made as early as possible rather than bolted on after the fact
- MLSecOps asks not just "is the application secure?" but "is the model behaving as expected, and does the system protect it from misuse?"
