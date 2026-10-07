# Server-Side Template Injection (SSTI)

**SSTI** is when an attacker sneaks their own code into a website's **template**. The server then runs that code.

## What is a template?

- A template is a page with blanks in it.
- The server fills the blanks with real data.
- Example: "Dear ___," gets filled with a person's name.

## How the problem starts

**Safe way:**

- The user's name is passed in as **data**.
- The template stays fixed.

**Unsafe way:**

- The user's input is **glued into the template itself**.
- The server can no longer tell data from instructions.

This is a bit like SQL injection.

## Why it matters

The damage can be very bad:

- The attacker may take **full control of the server**. This is called remote code execution.
- They may read **private data** or **files**.
- They may attack other systems inside the network.

## How attackers find it (3 steps)

**1. Detect**

- Type odd characters into a field.
- If the site shows an error, the input may be treated as template code.
- There are two places to check:
  - **Plaintext context:** the input appears as normal text. A maths test (like 7*7) will show 49 if the server runs it.
  - **Code context:** the input sits inside a template expression. It is easy to miss because it looks like a simple lookup.

**2. Identify**

- Find out which template engine the site uses.
- Error messages often name it.
- Or try different maths tricks and see which one works.
- Do not trust just one result. The same test can work in more than one engine.

**3. Exploit**

- Once you know the engine, you look for ways to abuse it.
- Labs will have the examples

## How to prevent it

1. **Best:** do not let users edit or submit templates.
2. Use a **logic-less engine** like Mustache. It has less power, so less can go wrong.
3. Use a **sandbox**. This is hard to get right and can often be bypassed.
4. Run the template system in a **locked-down Docker container**. Assume code might run, and limit the damage.
