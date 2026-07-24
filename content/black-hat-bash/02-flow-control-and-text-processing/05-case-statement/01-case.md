# case statement

> `case` statements used for string of conditions over `if-elif-elif-...-else-fi` conditions

```
case expression in
    pattern-1)
        # do something if pattern-1 condition met
    ;;
    pattern-2)
        # do something if pattern-2 condition met
    ;;
esac
```

- it starts with a `case` keyword
- the `expression` is a variable what will be tested against the patterns
- the patterns code block is in between `)` and `;;`
- the statement closed with a `esac` keyword

## example

```sh
#!/bin/bash

UNIT="${1}"

case ${UNIT} in
    zergling)
        echo "zerg basic unit"
        ;;
    marine)
        echo "terran basic unit"
        ;;
    zealot)
        echo "protoss basic unit"
        ;;
    *)
        echo "some other unit"
        ;;
esac
```

- `*)` works as a default/final case, everything else goes there
- call the script with "zergling"/"marine"/"zealot" or any other string
