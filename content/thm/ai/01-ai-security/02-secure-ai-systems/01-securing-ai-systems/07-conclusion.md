# conclusion

- `Architecture`: A production AI system has at least nine components and five trust boundaries, each requiring its own security controls (Task 2)

- `Frameworks`: OWASP LLM Top 10 (2025) ranks the risks. MITRE ATLAS maps the adversary's techniques. NIST AI RMF governs the organisational response. Together they form the vocabulary for AI security practice (Task 3)

- `Threats`: Five system-level categories target different trust boundaries in the architecture: unbounded consumption (LLM10), system prompt leakage (LLM07), improper output handling (LLM05), excessive agency (LLM06), and sensitive information disclosure (LLM02) (Task 4)

- `Defences`: Defence in depth at every boundary, least privilege for every component, input and output validation at every transition, and MLSecOps monitoring across the entire system (Task 5)
