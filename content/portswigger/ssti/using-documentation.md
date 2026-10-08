# [](https://portswigger.net/web-security/server-side-template-injection/exploiting/lab-server-side-template-injection-using-documentation)

> Delete `morale.txt` from Carlos's home directory: find out which template engine is used, then use its own documentation to run code.

## Log In and Edit a Template

- Log in with `content-manager` / `C0nt3ntM4n4g3r`.
- Go to a product and edit its **description template**.

This engine uses this syntax to show a value:

```
${someExpression}
```

## Trigger an Error

Try entering something that doesn't exist, like:

```
${foobar}
```

Save the template.

**Check the result.**
An error message appears. It names the template engine.

- It shows: **Freemarker**

## Check the Freemarker Docs

- Look in the documentation for the **FAQ** section.
- Find this question:

> "Can I allow users to upload templates and what are the security implications?"

- It explains that a feature called `new()` can be dangerous.

## Look Up `new()`

- Go to the **Built-in reference** section.
- Find the entry for `new()`.

> It explains:

- `new()` can create Java objects
- These objects must implement `TemplateModel`

## Check TemplateModel Classes

- Open the JavaDoc page for `TemplateModel`.
- Look at the list:

> "All Known Implementing Classes"

- Find this one:

```
Execute
```

> This class can run shell commands.

## Build the Payload

Put it together like this:

```
<#assign ex="freemarker.template.utility.Execute"?new()>
${ ex("rm /home/carlos/morale.txt") }
```

## Clean Up and Insert

- Remove your earlier test code (`${foobar}`).
- Put the new payload in its place.
- Save
