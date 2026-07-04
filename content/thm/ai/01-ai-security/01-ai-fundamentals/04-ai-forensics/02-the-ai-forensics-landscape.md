# the ai forensics landscape

`Data Processing`: Digital Forensics requiring the investigator/analyst to process vast amounts of data, armed with the power of parallelised deep learning & Transformer models, can providing insights and classifications on the processed data

`Anomaly Detection`: identifying attacks, can often be a “needle in a haystack” scenario, Machine Learning algorithms can learn and identify potential anomalie, turning the haystack into a handful of hay

`Scalability`: Modern infrastructures such as cloud, hybrid, remote endpoints, etc., generating more forensic data than ever, AI systems can scale effortlessly, enabling `DFIR` (Digital Forensics and Incident Response
) teams to cover more ground without a proportional increase in workload

## AI in the Wild

> AI/ML has already been heavily adopted into the DFIR landscape

<table>
  <tbody>
    <tr>
      <td>DFIR Task</td>
      <td>What AI/ML Enables</td>
      <td>Example Tools / Platforms</td>
      <td>How AI Solves It</td>
    </tr>
    <tr>
      <td>Anomaly Detection / UEBA</td>
      <td>Flags unusual user/system behavior compared to learned “normal”</td>
      <td>
        <a href="https://www.splunk.com/en_us/blog/learn/user-entity-behavior-analytics-ueba.html"
          >Splunk UEBA</a
        >, <a href="https://www.elastic.co/elasticsearch/machine-learning">Elastic ML</a>,
        <a href="https://www.exabeam.com/">Exabeam</a>
      </td>
      <td>
        AI uses unsupervised learning techniques (like Isolation Forests and Autoencoders) to learn
        baseline behaviour for users and systems. Deviations from this baseline are flagged as
        potential threats, even without predefined rules.
      </td>
    </tr>
    <tr>
      <td>Phishing &amp; Communication</td>
      <td>Detects phishing emails and flags risky language in chat/email logs</td>
      <td>
        <a
          href="https://www.microsoft.com/en-us/security/business/siem-and-xdr/microsoft-defender-office-365"
          >Microsoft Defender for O365</a
        >,
        <a href="https://splunkbase.splunk.com/app/6792">Splunk NLP</a>
      </td>
      <td>
        Transformer-based language models (e.g., BERT, RoBERTa) classify messages as phishing or
        benign based on tone, structure, and known attack patterns. These models help detect
        impersonation, urgency phrases, and malicious links.
      </td>
    </tr>
    <tr>
      <td>Malware / File Classification</td>
      <td>Classifies files as malicious or benign based on extracted static/dynamic features</td>
      <td>
        <a
          href="https://www.cyberdefensemagazine.com/stamina-a-new-approach-to-malware-detection-by-microsoft-intel/"
          >Microsoft Defender (STAMINA)</a
        >, <a href="https://arcticwolf.com/cylance/">Cylance</a>,
        <a href="https://blog.virustotal.com/2023/04/introducing-virustotal-code-insight.html"
          >VirusTotal ML integrations</a
        >
      </td>
      <td>
        AI systems analyse file metadata, code signatures, and sandbox behaviour to detect threats.
        These models are trained on large malware corpora to classify new files based on patterns
        learned from known threats.
      </td>
    </tr>
    <tr>
      <td>Alert Triage &amp; Prioritisation</td>
      <td>Automatically scores, ranks, and filters alerts to reduce analyst workload</td>
      <td>
        <a href="https://start.paloaltonetworks.com/introducing-cortex-xsiam-3"
          >Cortex XSOAR/XSIAM</a
        >,
        <a
          href="https://www.ibm.com/docs/en/qradar-common?topic=apps-qradar-advisor-watson-app&amp;"
          >IBM QRadar Advisor</a
        >,
        <a href="https://www.crowdstrike.com/en-us/platform/charlotte-ai/"
          >CrowdStrike Falcon + Charlotte AI</a
        >
      </td>
      <td>
        AI analyses past alert data, analyst feedback, and incident outcomes to rank alerts by
        severity and relevance. This reduces noise and surfaces the most urgent issues first, saving
        analysts time, a valuable resource in DFIR.
      </td>
    </tr>
    <tr>
      <td>Timeline &amp; Event Correlation</td>
      <td>Reconstructs attack timelines by clustering and linking logs across sources</td>
      <td>
        <a href="https://timesketch.org/">Timesketch</a>,
        <a href="https://docs.velociraptor.app/docs/overview/">Velociraptor</a>,
        <a href="https://github.com/jupyterlab/jupyter-ai">Jupyter-based analysis</a>
      </td>
      <td>
        AI clusters similar log events, identifies causal relationships, and aligns activity across
        systems. This helps analysts visualise attack chains and reconstruct incident timelines
        faster. Again, time is a valuable resource , and one of the key benefits of integrating AI
        into DFIR.
      </td>
    </tr>
  </tbody>
</table>

## AI Limitations

### Probabilistic vs Deterministic

> Traditional software and algorithms are deterministic, however AI systems and modern machine learning models are generally probabilistic, the same input does not result in the same output when you ask AI a query.

### Accuracy vs Precision vs Recall

> the performance of an AI model can be evaluated by the metrics below:

- `Accuracy` refers to the overall rate of correct predictions, a model can be overtrained on training data, what directly affect the accuracy of a model, 99% in defense can be a very bad number, even it sounds great on paper

- `Precision` measures how often a model's positive predictions are correct, in other words, out of all of the files flagged as malicious, how many are actually malicious

- `Recall` measures how successful the model was in identifying all positives in the provided dataset, identifying 18 out of 20 malicious files present would result in a 90% recall

> these metrics can be misleading in isolation, however, if we consider all of these metrics together, we can gain a deeper insight into the model's performance

### Garbage In, Garbage Out

> `GIGO` (Garbage In, Garbage Out) principle is just as true for AI systems as it is for any system, the quality of an AI's output is directly determined by the quality of its input

### What Does This Mean?

> AI offers powerful capabilities in DFIR, it's not a silver bullet tho, its non-determinism, evaluation challenges, and performance trade-offs mean it should never replace human expertise, but can accelerate and enhance human work
