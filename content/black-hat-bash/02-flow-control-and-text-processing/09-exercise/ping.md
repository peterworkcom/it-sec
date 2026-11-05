```sh
#!/bin/bash

if [[ $# -lt 2 ]]; then
    echo "error: 2 arguments needed" >&2
    echo "usage: $0 <name> <target>" >&2
    exit 2
fi

file="ping.csv"
date=$(date "+%Y-%m-%d %H:%M:%S")

if [[ ! -f "$file" ]]; then
    echo "date,name,target,result" > "$file"
fi

result=$(ping -w 10 -c 4 "$2" 2>&1)
exit_code=$?

echo "$date,$1,$2,\"$result\"" >> "$file"

if [[ "$exit_code" -ne 0 ]]; then
    echo "error: ping unsuccessful, see $file" >&2
    exit $exit_code
fi

echo "ping successful, check $file"
```
