# How Shells Inside Shells Work

## 1. Terminal vs shell

**Terminal** = the window (or tab) you see.

**Shell** = the program inside it that reads your commands. Examples: `bash`, `zsh`.

One window can hold **many shells**, one inside another.

---

## 2. A shell inside a shell

When you start a shell from another shell, you get a **parent** and a **child**.

```
bash  (parent)
 └── bash  (child)
```

**Try it:**

```bash
bash
```

The screen looks the same. But you are now inside a **new shell**.

The parent is still there. It **waits** until you leave the child.

---

## 3. How deep am I?

### Check the level number

```bash
echo $SHLVL
```

- `1` = one shell
- `2` = one shell inside another
- `3` = two shells inside, and so on

### See the whole chain

```bash
pstree -s $$
```

Example output:

```
systemd───gnome-terminal───bash───bash───pstree
```

Each `bash` is one shell level.

**Try it:**

```bash
echo $SHLVL
bash
bash
echo $SHLVL
pstree -s $$
```

The number goes up by 2. The chain shows 2 more `bash`.

---

## 4. How variables travel

### Rule 1: Variables only go **down**

A child gets a **copy** from its parent. A parent **never** gets anything from its child.

### Rule 2: Only **exported** variables are copied

**Normal**: stays in this shell only.

```bash
COLOR="red"
```

**Exported**: children get a copy.

```bash
export FRUIT="apple"
```

### Example: the child gets a copy

```bash
export FRUIT="apple"
bash
echo $FRUIT
```

Shows: `apple`

### Example: the child changes its copy

```bash
FRUIT="banana"
echo $FRUIT
```

Shows: `banana`

```bash
exit
echo $FRUIT
```

Shows: `apple`

The parent was **not** changed.

### Example: no export = no copy

```bash
COLOR="red"
bash
echo $COLOR
```

Shows: **nothing**

```bash
exit
echo $COLOR
```

Shows: `red`

**Clean up:**

```bash
unset FRUIT COLOR
```

---

## 5. Going back out

### Leave a shell

```bash
exit
```

This closes the child. You go back to the parent.

Leave in order: **innermost first**.

### The only thing that comes back: the exit code

A child can only send back **one number**.

- `0` = it worked
- anything else = something failed

**Try it:**

```bash
bash
exit 5
echo $?
```

Shows: `5`

`$?` holds the exit code of the last thing that finished.

---

## 6. Like a function in a function

### Where it matches

- **The outer one waits** for the inner one to finish
- **Copies go in**, like passing values into a function
- **You leave in order**, innermost first

### Where it is different

- Each shell is a **separate program**, not part of one program
- A function can return any value. A shell can only return a **number** (the exit code)

---

## 7. Cheat sheet

| Command           | What it does                            |
| ----------------- | --------------------------------------- |
| `bash`            | Start a child shell                     |
| `exit`            | Leave the current shell                 |
| `exit 5`          | Leave and send back the number 5        |
| `echo $?`         | Show the last exit code                 |
| `echo $SHLVL`     | Show how deep you are                   |
| `pstree -s $$`    | Show the full chain of shells           |
| `NAME="x"`        | Make a normal variable (stays here)     |
| `export NAME="x"` | Make an exported variable (copied down) |
| `unset NAME`      | Delete a variable                       |
