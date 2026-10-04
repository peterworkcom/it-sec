# Data Supply Chain and STRIDE's Gaps

## The AI Data Supply Chain

> Traditional applications have software supply chains, dependencies, libraries, container images, AI systems inherit all of those risks and add an entirely separate supply chain built around data

### Stage 1: Data Collection

> Training data is gathered from multiple sources, an attacker who can contribute or influence any of that sources has a foothold

### Stage 2: Cleaning and Labelling

> Raw data is preprocessed, filtered, and labelled, a mislabelled dataset doesn't look corrupted, it just quietly teaches the model to make incorrect decisions

### Stage 3: Model Training

> Any poison that survived the first two stages is now embedded in the model's weights, a poisoned model may need to be retrained from scratch, at significant time and cost

### Stage 4: Validation and Packaging

> The trained model is evaluated, versioned, and stored in a model registry for deployment. If the registry itself is compromised, an attacker can swap a validated model for a backdoored one

### Stage 5: Inference

> In a RAG system, any text an attacker can get into the document store becomes part of the prompt at query time, and since the model can't distinguish retrieved data from its own instructions, planting a paragraph in an ingested source is effectively a way to issue commands to the system

---

> Each stage is a link in the chain, and each link is a potential point of compromise, the critical difference from traditional software supply chains is time, a poisoned training dataset may not reveal its effects for weeks or months, only surfacing after the model is retrained, validated, and deployed to production

## Why STRIDE Alone Falls Short

> STRIDE (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege)

- spoofing
- tampering
- repudiation
- information disclosure
- denial of service
- elevation of privilege

> STRIDE (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege), has been the backbone of threat modeling since Microsoft introduced it in the late 1990s, it remains highly effective for traditional applications, but when applied to AI systems without adaptation, it has documented gaps:

- `Data integrity isn't a first-class concern at the training level` -> tampering with training data is fundamentally different, the effects are nearly invisible, a poisoned training set doesn't throw an error, it produces a model that behaves incorrectly in subtle, hard-to-detect ways

- `Adversarial manipulation of model behaviour doesn't fit neatly into one category` -> malicious inputs for models spans multiple STRIDE categories simultaneously, STRIDE wasn't designed for threats that blur across categories this way

- `The scope of privilege has expanded beyond what STRIDE originally envisioned`-> A jailbroken chatbot with tool access isn't just a traditional privilege escalation, the model's entire set of tool permissions becomes the attacker's capabilities

- `Model-specific intellectual property theft is a different kind of disclosure` -> Extracting a model's weights through carefully crafted API queries is technically Information Disclosure, but it's profoundly different from exfiltrating a database
