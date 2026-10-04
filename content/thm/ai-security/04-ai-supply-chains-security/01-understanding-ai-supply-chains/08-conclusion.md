# conclusion

> Supply chain attacks work because people **trust** the thing they install or download. The attackers do not break in. They use that trust.

## The examples

- **torchtriton:** A package stole keys from developers. They had only run a normal install command.
- **Hugging Face models:** The models did their job correctly. In the background, they also connected to attacker servers.
- **Solana package:** It was compromised for only a few hours. It still caused six-figure losses.

## Why they are hard to stop

- The malicious models looked professional. They had good model cards and believable organisation names.
- They really worked, so they passed the checks an ML engineer would normally run.
- The problem only showed up when strange network connections were noticed. Sometimes this took weeks.

## Key takeaways:

- **Model files are code in disguise.** Pickle-based models execute at load time; format choice determines your exposure.
- **The four attack layers are distinct.** Model, dependency, data, and infrastructure attacks require different defences and produce different forensic signals.
- **Transitive dependencies silently expand your attack surface.** You are responsible for every package pip installs, not just the ones you listed.
- **Automated scanners are not a complete defence.** The NullifAI case shows that malformed files can pass platform checks while remaining executable.
- **Infrastructure compromise beats content filtering.** Stolen credentials on a trusted repository push malicious code with full legitimacy; no tooling flags it at download time.
- **SafeTensors eliminates serialisation-level attacks.** It does not eliminate architecture-level or weight-level attacks; the format is a single control, not a complete solution.
