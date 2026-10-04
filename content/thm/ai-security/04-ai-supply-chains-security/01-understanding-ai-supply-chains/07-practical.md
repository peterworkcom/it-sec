# practical

## Look at the suspicious model

Check these five places:

1. **Model Card tab**: Is the documentation full or thin?
2. **Files tab**: Is the file format Pickle or SafeTensors? Are there warnings?
3. **Security tab**: What did the automated scan find?
4. **Sidebar**: Check the organization, the downloads, and when it was created.
5. **Community tab**: Are there warnings from other users?

## Compare to a trusted model

This is **google-bert/bert-base-uncased**. It is very popular and has been around for 6+ years.

| What to check | Trusted model (the baseline) | Suspicious model (you decide) |
| ------------- | ---------------------------- | ----------------------------- |
| Organisation  | Verified, long history       | Verified? When did it join?   |
| Downloads     | Millions                     | How many last month?          |
| File format   | SafeTensors                  | Pickle or SafeTensors?        |
| Security scan | No issues                    | Any issues?                   |
| Model card    | Full details                 | Full or thin?                 |

## Why this matters

- **Pickle files** can hide harmful code. It can run when you load the model.
- **SafeTensors files** only store data, so they are much safer.
- **Few downloads, a new account, or a thin model card** are warning signs.

## The final question

Ask yourself:

> **Would I approve the first model for production?**

If the signals look worse than the trusted model, the answer is probably **no**.

## Model safety checklist

Tick each box as you go.

#### 1. Model Card tab

- [ ] Is it long and detailed?
- [ ] Does it explain the training data?
- [ ] Does it list limitations?

**Red flag:** it is short or nearly empty.

#### 2. Files tab

- [ ] What is the file format?
- [ ] Are there any warnings?

**Safe:** SafeTensors
**Risky:** Pickle

#### 3. Security tab

- [ ] Did the scan find any issues?

**Red flag:** any warning or flagged item.

#### 4. Sidebar

- [ ] Is the organisation verified?
- [ ] When did the account join?
- [ ] How many downloads last month?
- [ ] When was the model created?

**Red flags:**

- Not verified
- A very new account
- Very few downloads

#### 5. Community tab

- [ ] Are there discussions?
- [ ] Are there warnings from other users?

**Red flag:** users reporting problems, or no activity at all.

#### 6. Compare with the trusted model

Click **"Compare: Verified Model"**. For each row above, ask:

- [ ] Is the first model as good as the trusted one?
- [ ] Where is it worse?
