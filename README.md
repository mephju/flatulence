# flatulence
Flatten objects and arrays so that each key is the full path to a primitive value. Paths are lodash-compatible. Inflate flattened objects and make them regular JSON objects again.



```javascript
const flatu = require('flatulence')

const flattened =  flatu.deflate({
  a: 1,
  b: {
    c: 1,
    d: [1,2,3]
  }
})

const regular = flatu.inflate(flattened)
```
