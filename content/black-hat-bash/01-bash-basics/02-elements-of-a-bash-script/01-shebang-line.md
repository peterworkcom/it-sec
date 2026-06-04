# shebang line

```sh
#!/bin/bash
```

- every script should with a shebang or hashbang line
- `#!` -> shebang
- `/bin/bash` -> full path to the script interpreter

> different interpreters

```sh
#!/usr/bin/env <interpreter>
```

`#!/usr/bin/env python3` or `#!/usr/bin/python3` -> python
`#!/usr/bin/env ruby` or `#!/usr/bin/ruby` -> ruby
`#!/usr/bin/env node` -> node.js
`#!/usr/bin/env perl` -> perl
`#!/bin/sh` -> sh
`#!/usr/bin/env zsh` -> zsh

> what is a shell script

A shell is specifically a program that provides a commandline interface to the operating system - you type commands, it runs them. Shells like `bash`, `sh`, `zsh`, `fish`, and `ksh` are designed primarily for:

- Interactive use (typing commands at a prompt)
- Running other programs and chaining them together (pipes, redirects)
- Basic scripting to automate sequences of commands

> style guide for shell script

```
https://google.github.io/styleguide/shellguide.html
```

> shebang line can accept arguments

```sh
#!/bin/bash -x
```

```sh
#!/bin/bash -r
```

- `-x` -> print all commands and arguments as it is executed
- `-r` -> creates a restricted bash shell that prevents some potentially dangerous commands in the script

> these arguments can be added to a script outside from the script too

```bash
bash -r someScript.sh
```

- the `-r` will give the same restrictions as it would be in the shebang line in the script
