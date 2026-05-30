# arrays

> bash only do flat arrays (no nested arrays)

- arrays are indexed
- first element index is 0

> declare array between `()`

```
#!/bin/bash

units=("marine" "zergling" "zealot")

echo ${units[*]}
echo ${units[1]}
echo ${units}
```

- the `[*]` will let all the element to be printed
- the `[1]` will let the second element to be printed
- just the variable name will let the first element to be printed

> delete (`unset`) value

```
#!/bin/bash

units=("marine" "zergling" "zealot")
echo ${units[*]}

unset units[1]
echo ${units[*]}
```

- the second element get deleted

> add and reassign

```
#!/bin/bash

units=("marine" "zergling")
echo ${units[*]}

units[2]="zealot"
echo ${units[*]}

units[0]="spacemarine"
echo ${units[*]}
```
