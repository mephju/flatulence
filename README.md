# flatulence
Flatten objects and arrays so that each key is the full path to a primitive value. Paths are lodash-compatible. Unflatten flattened objects and make them regular JS objects again.



```javascript
const flatulence = require('flatulence')

// Create a flat object
const flattened =  flatulence.flatten({
  a: 1,
  b: {
    c: 1,
    d: [1,2,3]
  }
})
// { a: 1, 'b.c': 1, 'b.d[0]': 1, 'b.d[1]': 2, 'b.d[2]': 3 }

// Create a flat object and provide a prefix to each key
var flattened2 = flatulence.flatten(
    { a: 1, b: { c: 1, d: [ 1, 2, 3 ] } }, 
    'my.prefix.key'
)

//{ 'my.prefix.key.a': 1,
//  'my.prefix.key.b.c': 1,
//  'my.prefix.key.b.d[0]': 1,
//  'my.prefix.key.b.d[1]': 2,
//  'my.prefix.key.b.d[2]': 3 }




const regular = flatulence.unflatten(flattened)
// { a: 1, b: { c: 1, d: [ 1, 2, 3 ] } }


// Only unflatten a sub object
const b = flatulence.unflatten(flattened, 'b')
// { c: 1, d: [ 1, 2, 3 ] }

// Sub objects can even be arrays
const array = flatulence.unflatten(flattened, 'b.d')
// [ 1, 2, 3 ]
```
