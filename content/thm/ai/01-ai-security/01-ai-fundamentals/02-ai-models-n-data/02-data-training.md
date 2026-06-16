# data training

## where does the data come from:

<table>
  <thead>
    <tr>
      <th>Source</th>
      <th>What it is</th>
      <th>Trust profile</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Web scraping</td>
      <td>Automated crawls of public internet content (news, forums, blogs, social media, etc.)</td>
      <td>Low: no curator, no version control, content changes after collection</td>
    </tr>
    <tr>
      <td>Licensed datasets</td>
      <td>
        Data purchased or agreed with platforms (e.g., OpenAI + Reddit, Meta's own social posts)
      </td>
      <td>Medium: terms often unclear; original users rarely consented to AI training use</td>
    </tr>
    <tr>
      <td>Synthetic data</td>
      <td>AI-generated content used to train further AI systems</td>
      <td>
        Variable: growing fast; ~12% of fine-tuning datasets now contain LLM-generated content
      </td>
    </tr>
    <tr>
      <td>Internal corpora</td>
      <td>Company knowledge bases, support transcripts, clinical notes used for fine-tuning</td>
      <td>Higher: organisation has direct control, but also direct liability if mishandled</td>
    </tr>
  </tbody>
</table>

- most widely used training dataset is `Common Crawl`, a free, publicly available archive of web crawl data that has underpinned essentially every major model family

## problem of provenance

> data provenance is the ability to answer three questions about any piece of training data:

- where did it come from?
- when was it collected?
- has it been modified since?

> in most AI supply chains today, the honest answer to all three is we don't fully know

## `PII` in the pipeline

> one of the most direct consequences of undocumented, large-scale web scraping is that `personally identifiable information` (`PII`) ends up baked into model weights, once it's there, it's very difficult to remove

## model engineer

> model's behavior is a direct product of what it was trained on, if that data was scraped without audit, contaminated with PII, or manipulated upstream, those characteristics become part of the model.

> data supply chain is as real and as exploitable as a software supply chain
