# the black box problem

## Models Are a Black Box

> Source codes are readable, binaries can be disassembled, but model's weight are not. The data inside non human readable, cannot "open" a model and tell why is it behave in a certain way.

- trusting in a model is trusting the process that produced it
- can sample the behavior but cannot audit it
- can tell model behavior on tried inputs
- cannot tell model behavior on never tried inputs (future ideas)

## Model Cards

> structured document that accompanies a model and describes what it is, how it was built, and where it falls short

<table>
  <thead>
    <tr>
      <th>Section</th>
      <th>What it should tell you</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Training data</td>
      <td>What sources were used, how they were filtered, known gaps or biases</td>
    </tr>
    <tr>
      <td>Intended use</td>
      <td>What the model was designed for (and explicitly what it wasn't)</td>
    </tr>
    <tr>
      <td>Evaluation results</td>
      <td>Performance metrics across different conditions and demographics</td>
    </tr>
    <tr>
      <td>Known limitations</td>
      <td>Conditions under which the model is known to underperform or behave unexpectedly</td>
    </tr>
    <tr>
      <td>Bias assessment</td>
      <td>Where training data or evaluation may have introduced skew</td>
    </tr>
    <tr>
      <td>Licence</td>
      <td>What you're legally permitted to do with the model</td>
    </tr>
  </tbody>
</table>

## The Gaps

> `model cards` can also be frequently incomplete, vague, or absent entirely, there's no regulatory requirement to produce one and not many companies want to disclose limitations that might reduce adoption

## In Short

> A model can be just a black box and the hope that whoever built it was thorough, the user could fly blind. In security, hope is not a control.
