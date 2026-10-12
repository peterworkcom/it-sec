# When Vectors Combine

In the TryTrainMe attack, the attacker used **three methods at the same time**. This gave them backup options. If one method was blocked, another was already in place.

## What happened, week by week

**Week 1**

- The attacker created a fake organisation on Hugging Face called "trustworthy-ai-lab".
- They uploaded a backdoored model containing a harmful pickle payload.
- At the same time, they put a fake package called `internal-ml-utils==99.0.0` on PyPI. It copied the name of TryTrainMe's internal package.

**Week 2**

- A TryTrainMe engineer downloaded the model for the code review pipeline.
- When the model loaded, `pickle.load()` ran the hidden code silently.
- The code connected to the attacker's server (a C2 beacon).

**Week 3**

- A routine `pip install -r requirements.txt` pulled in the attacker's fake package.
- This gave the attacker a **second foothold**, separate from the model.

**Detection**

- The SOC (security team) got an automated alert. It flagged repeated outgoing connections to an unknown domain.

## The three attack methods

| Method                  | How it works                        | Role                            |
| ----------------------- | ----------------------------------- | ------------------------------- |
| Pickle payload          | Code runs when the model loads      | Main way in                     |
| Dependency confusion    | Fake package runs on install        | Backup way in                   |
| Repository manipulation | Fake organisation looks trustworthy | Builds trust so people download |

## Key takeaway

Supply chain attacks work because they give attackers **many separate paths** to run code. Blocking only one path is not enough. You need **layers of defence** on every attack surface.
