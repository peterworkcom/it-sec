# building the model

> the following topics are key concept during a model building that affects its security level

## epochs and overfitting

> `epoch`: one complete pass of the training algorithm through the entire dataset, models are trained over many epochs

> `overfitting`: train a model for too long and the model stops learning general patterns and starts memorizing training data specifically

- the catch is that more epochs don't always mean a better model, an overfit model performs well on its training data but poorly on other data
- overfitting matters for security, a model can "memorise" specific details from its training data, including sensitive ones, making it more likely to reproduce them when prompted

## model validation

> `validation set`: a portion of the training data is held back and never used for training

- during training, the model is tested on unseen data to check whether its performance is actually generalising or just improving on the training examples it's seen before
- if training accuracy keeps climbing but validation accuracy plateaus or drops, that's overfitting in real time
- from a security perspective, validation is the quality gate in the `ML` lifecycle

## post-training optimization

> after a model is trained, it often goes through compression before deployment

<table>
  <thead>
    <tr>
      <th>Technique</th>
      <th>What it does</th>
      <th>Security consideration</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Pruning</td>
      <td>Removes parameters that contribute little to predictions, shrinking model size</td>
      <td>Changes model behaviour post-training; rarely documented in detail</td>
    </tr>
    <tr>
      <td>Quantisation</td>
      <td>
        Reduces numerical precision of weights (e.g., 32-bit to 8-bit floats) to cut memory and
        compute requirements
      </td>
      <td>
        Can degrade safety-aligned behaviour; backdoor defences tested on full-precision models may
        fail to detect threats in quantised versions
      </td>
    </tr>
  </tbody>
</table>

## federated learning

> instead of a single central location for model training, the model is trained across many decentralized devices or organizations

- each participant training locally on their own data and only sending weight updates (not the raw data itself) back to a central server for aggregation
- this is design with privacy in mind
- the security trade-off, is that the integrity of the training process becomes much harder to verify
- in a federated setup, participants can submit poisoned local updates
