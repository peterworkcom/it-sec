# debugging

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

## the `EOF` why line 6 and not line 5

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
