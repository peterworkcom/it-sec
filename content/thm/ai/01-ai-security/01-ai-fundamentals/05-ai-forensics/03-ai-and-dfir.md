# AI and DFIR (Digital Forensics and Incident Response)

## Image and Video Forensics

> Digital image and video forensics is excellent for AI/ML and its capabilities, making our lives in DFIR easier.

> `CNN (convolutional neural networks)`: a type of neural network that automatically learns patterns in data using small filters commonly used for images, it can also be applied spatial or sequential patterns.

- `CNN-Based Forgery Detection`: `CNN` combining with `ELA` (Error Level Analysis) to identify image tampering, this approach achieved a high accuracy rating of 94%

- `Deepfake Detection`: Deepfakes are one area which has seen a dramatic increase in quality, `CNN` models have started being used with some other AI technologies to develop specialised detectors

- `GANs (Generative Adversarial Networks)`: a setup where two neural networks compete: one generates fake media, and the other tries to detect it, as they battle, both improve

## Communication Analysis

> Communication analysis involves the process large volumes of text

- `Phishing Email Detection`: `Transformer-based` models that are trained for `NLP (Natural Language Processing)`, such as `BERT` and `RoBERTa`, excel at identifying phishing emails, it achieved 99% accuracy

- `Chat Log and Social Media Analysis`: The same technology mentioned above is also harnessed by some forensic platforms, to automatically scan chats for keywords or patterns related to threats

## Timeline Reconstruction and User Behaviour

> Reconstructing incident timelines is a common and critical part of an investigation

- `Automated Event Timeline Reconstruction`: AI systems are particularly adept at correlating time-sequenced data from multiple sources and putting together what happened before, during, and after an incident

- `Anomaly Detection`: AI is incredibly good at identifying patterns, in `DFIR`, this ability can give you an eagle eye, defend against what it has chosen to be abnormal, potentially dangerous behaviour

## Malware Detection/Analysis

> AI/ML has also lent itself greatly to the area of Malware detection and analysis

- possible to classify a file as malicious or benign

- dynamic analysis, observing how a program behaves to identify whether it is malicious or not

- using some form of AI/ML is now very common in antivirus and endpoint detection response (EDR) products
