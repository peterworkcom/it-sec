# [Complimentary](https://tryhackme.com/room/hh-complimentary-05e0b604?vccr=1)

## setup

- open the attack machine
- open a firefox
- paste the given link in the url

## collecting credentials

- check the page source
- there is an `app.js` link, open it
- there are credentials as `const`, copy them

```js
const IDENTITY_POOL_ID = "...";
const AWS_REGION = "...";
const TABLE_NAME = "...";
```

- open the network tab
- there is a `POST` request to `https://cognito-identity.us-east-1.amazonaws.com/`
- check its responses credentials

```
AccessKeyId     "..."
SecretKey       "..."
SessionToken    "..."
```

- or in the browser console type:

```
AWS.config
```

- and look up the same credentials there

## getting the flag

- in terminal config an aws

```bash
aws configure
```

- add the requested credentials from the saved ones
- on the `Default output format [None]:` just hit enter
- then type `aws dynamodb scan --table-name <TABLE_NAME>`

```bash
aws dynamodb scan --table-name complimentary-GuestWellnessProfiles
```

- look up the flag

> What is the flag?

```
THM{fr33_app_fr33_d4t4!}
```
