# [Limit overrun race conditions](https://portswigger.net/web-security/race-conditions/lab-race-conditions-limit-overrun)

> apply the coupon multiple times on one item

- open Burp Suite and visit the page
- log in, and on the home page find the `Lightweight "l33t" Leather Jacket` item
- add one to the basket then got to the basket
- apply the coupon to the item then remove it

> burp suite section

- check the history and send the `/cart/coupon` request to the repeater
- the repeater elements are in numbered tabs, right click on the one you just sent
- `Add tab to group` -> `New tab group`
- give a name to the group then accept
- now the group has one element, the original tab
- right click on it
- `Duplicate tab` -> give the duplication number 19 to it
- next to the send button there is a little arrow looking down
- pick `Send group in parallel`
- click `Send group`
- it should apply the promotion multiple times
