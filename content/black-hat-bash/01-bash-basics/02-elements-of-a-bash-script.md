# Elements Of A Bash Script

## shebang line

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

> shebang line can accept arguments

```
#!/bin/bash -x
#!/bin/bash -r
```

- `-x` -> print all commands and arguments as it is executed
- `-r` -> creates a restricted bash shell that prevents some potentially dangerous commands in the script

> these arguments can be added to a script outside from the script too

```
bash -r someScript.sh
```

- the `-r` will give the same restrictions as it would be in the shebang line in the script

## comment & command

```
#!/bin/bash

#comment
# comment
echo "Hey hey" # comment
```

## execution

- create the content above in a file and save it under the name `hey.sh`
- run the following command in the folder where the `hey.sh`

```
chmod u+x hey.sh
./hey.sh

Hey hey
```

- the `chmod u+x hey.sh` makes the `hey.sh` file executable
- the `./hey.sh` will execute the `hey.sh` file
- the `./anyFile.sh` tells to run the file that is executable

## execution alternative (not common)

- create another file `hey2.sh`
- make the content like below, without the `#!/bin/bash`

```
echo "Hey hey too"
```

- stand in the same folder and run the command

```
bash hey2.sh
```

- this time the `#!/bin/bash` and the `chmod u+x hey2.sh` was not needed, with a simple `bash` command it did run, but this approach is not common

## debugging

- create the following file `noHey.sh`

```
#!/bin/bash

echo "Hey hey"
ech "No hey here"
echo "Still no hey here
echo "what?"
```

- execute it with the commands below

```
bash noHey.sh

Hey hey
noHey.sh: line 4: ech: command not found
noHey.sh: line 6: unexpected EOF while looking for matching `"'
```

- it has a command error `ech: command not found` and a syntax error `unexpected EOF while looking for matching "'`
- the `ech` would be `echo` but misspelled and the `ech` command does not exist
- the `EOF` would mean that bash can not find the expected `"`

#### the `EOF` why line 6 and not line 5

- even the issue at line 5 the syntax error looks till the end of the file, hoping might find the missing `"` there, when it is not at the last line bash throws the syntax error for the missing `"` but the check is already at the line 6, that is why the syntax error is on line 6

> dry run execution

```
bash -n noHey.sh

noHey.sh: line 6: unexpected EOF while looking for matching `"'
```

- with the `-n` option it checks for syntax error (`command not found` is not a syntax error) without running the file

> trace mode

```
bash -x noHey.sh

+ echo 'Hey hey'
Hey hey
+ ech 'No hey here'
noHey.sh: line 4: ech: command not found
noHey.sh: line 6: unexpected EOF while looking for matching `"'
```

- with `-x` prints out all the commands before execution with a `+` in front of them

> in line debugging

- create a file `chat.sh` file with the content then execute it

```
#!/bin/bash

set -x
echo "Hey hey"
set +x
echo "Hello there"
echo "Good talk"
echo "Not really"
```

- the `set -x` and `set +x` sets up a trace mode area, only that area will be "traced"
- don't forget the `chmod u+x chat.sh`

```
./chat.sh

+ echo 'Hey hey'
Hey hey
+ set +x
Hello there
Good talk
Not really
```
