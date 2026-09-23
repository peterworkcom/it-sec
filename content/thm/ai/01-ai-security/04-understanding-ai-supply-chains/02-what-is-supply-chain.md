# Supply Chain

## 1. What is a supply chain?

Think about **building a house**.

- You don't make everything yourself.
- You buy bricks from one company.
- You buy wood from another.
- You buy wires and pipes from others.

All these suppliers together are called a **supply chain**.

**Key idea:** The house is only as safe as its **weakest part**. If the wires are bad, the whole house is at risk.

---

## 2. Software has supply chains too

Software is built the same way.

- A program uses **packages**. These are ready-made pieces of code written by other people.
- One program might use **hundreds** of packages.
- Some packages bring in **other packages** automatically. These are called **transitive dependencies**.

So when you install one package, you trust **all** the packages behind it too.

**Every link in the chain is a place where something could go wrong.**

---

## 3. Why supply chain attacks work

Attackers don't break in through the front door.

Instead, they **hack something you already trust**.

Two famous examples:

**SolarWinds (2020)**

- Attackers hid bad code inside a real software update.
- About **18,000 organisations** were affected, including US government agencies.

**Log4Shell (2021)**

- A serious weakness was found in **Log4j**, a very popular tool.
- **Millions** of programs were at risk.

---

## 4. The big lesson

- The victims **did nothing wrong**. They used trusted software.
- The problem came from **further up the chain**.
- Attackers like this method because **one attack can reach thousands of systems at once**.
