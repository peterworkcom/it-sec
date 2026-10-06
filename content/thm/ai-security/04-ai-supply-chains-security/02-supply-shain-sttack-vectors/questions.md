# questions

> What Python method does pickle call to get reconstruction instructions for custom objects?

```
__reduce__
```

> What built-in Python module is commonly abused in pickle payloads to execute system commands?

```
os
```

> Converting a Keras model to SafeTensors format removes pickle-based payloads. What type of attacks does it leave completely untouched?

```
architecture-level attacks
```

> A Keras model is converted from .h5 to the SafeTensors format. What type of suspicious layer does this conversion fail to remove?

```
Lambda
```
