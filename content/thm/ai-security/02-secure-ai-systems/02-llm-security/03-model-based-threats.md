# model based threats

> Model-based threats exploit the model itself as the attack surface, abusing how information is encoded within its parameters and representations, as a consequence, these attacks may expose intellectual property (model weights) or sensitive training data that the model has memorised

## Model Extraction

> `Target / Attack Surface`: Model parameters (intellectual property)

> `Input`: Large volumes of carefully chosen API queries

> `Output`: A surrogate or distilled model that replicates the original model's behaviour

- copying a machine learning model's functionality or parameters without authorisation
- interact with an LLM through its public API
- send a large number of prompts
- the responses to these prompts are then stored in a sort of input-output pair
- with more and more pairs can be used to train a surrogate model
- what imitates the target model's behaviour

## Model Inversion

> `Target / Attack Surface`: Model's internal representations

> `Input`: Unknown or partially known data, or model embeddings/outputs

> `Output`: New training data or attributes reconstructed from the model

- exploit a model's output to reveal information about its training data

**this attack often gets confused with a membership inference attack**

- Model inversion attacks treat the model as a source of stored information rather than a classifier to be probed

- instead of testing whether a known example was seen during training, the attacker iteratively queries the model to reconstruct unknown training data
