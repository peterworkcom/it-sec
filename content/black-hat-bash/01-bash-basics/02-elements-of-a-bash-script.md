# Elements Of A Bash Script

> shebang line

```
#!/bin/bash
```

- every script should with a shebang or hashbang line
- `#!` -> shebang
- `/bin/bash` -> full path to the script interpreter

> different interpreters

```
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
