# [Basic server-side template injection (code context)](https://portswigger.net/web-security/server-side-template-injection/exploiting/lab-server-side-template-injection-basic-code-context)

> Delete a file called `morale.txt` from Carlos's account: Find a weak spot in a Tornado template, then run your own code.

## Log In and Comment

- Turn on Burp (so it can see your traffic).
- Log in with `wiener` / `peter`.
- Post a comment on any blog post.

## Find the Display Setting

- Go to **My Account**.
- Look for the option to show your **full name**, **first name**, or **nickname**.
- Pick one and submit it.

This sends a request called:
`POST /my-account/change-blog-post-author-display`

## Send It to Repeater

- In Burp, go to **Proxy** -> **HTTP history**.
- Find that request.
- Right-click -> **Send to Repeater**.

## Test for the Bug

Tornado templates use double curly braces, like this:
`{{ someCode }}`

Try sending this value:

```
blog-post-author-display=user.name}}{{7*7}}
```

Then reload your comment page.

**Check the result.**
If the name shows something like `Peter Wiener49}}`, it worked.

That `49` means `7*7` ran as code. This proves the bug is real.

## Find the Code-Execution Syntax

Tornado lets you run Python using:

```
{% somePython %}
```

Python's `os` module can run system commands with:

```
os.system('command here')
```

## Build the Real Payload

Put both pieces together:

```
{% import os %}
{{os.system('rm /home/carlos/morale.txt')}}
```

## Send the Final Request

Go back to Repeater.

Use this value (URL-encoded):

`blog-post-author-display=user.name}}{%25+import+os+%25}{{os.system('rm%20/home/carlos/morale.txt')`

Send it.

## Finish

- Reload the page with your comment.
- This runs your code.
- The file gets deleted.
