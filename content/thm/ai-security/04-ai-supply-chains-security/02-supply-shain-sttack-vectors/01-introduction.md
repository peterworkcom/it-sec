# introduction

# You will look at **four attack types**:

1. **Malicious model files (pickle)**
2. **Dependency confusion**
3. **Model repository manipulation**
4. **API provider compromise**

## Learning objectives

- Explain how pickle can run code. This happens through the `__reduce__` method.
- Check a suspicious model file safely using **pickletools**.
- Describe how dependency confusion and typosquatting attacks work.
- Spot the warning signs of a compromised model repository.
- Recognise attacks on models used through an API:
  - silent updates
  - stolen keys
  - prompt template injection
