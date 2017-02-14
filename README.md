# flatulence
Flatten objects and arrays into non-nested objects and arrays.
A flattened object consists of key paths pointing to primitive values.
Paths are lodash-compatible so they can be used with _.set() and _.get(). 

Unflatten flattened objects and make them regular, nested JS objects again.

## Installation
```bash
npm i flatulence
```



## Usage
To merely flatten an object you simply need to do this:
```
const flatulence = require('flatulence')


// Create a flat object
const flattened =  flatulence.flatten({
  a: 1,
  b: {
    c: 1,
    d: [1,2,3]
  }
})

//  { 
//    a: 1, 
//    'b.c': 1, 
//    'b.d[0]': 1, 
//    'b.d[1]': 2, 
//    'b.d[2]': 3 
//  }
```

Optionally you can decide to keep empty arrays and objects. Per default empty arrays or objects will not appear in the flattened output. You can change that: 
```
const flattened = fl.flatten.keepEmpty({
  "name": "Mega Group 2",
  "loginId": "admin_mega_merchant_2",
  "description": "again, some description here",
  "merchantUsers": [],
  "map": {}
})
//
//  { 
//    name: 'Mega Group 2',
//    loginId: 'admin_mega_merchant_2',
//    description: 'again, some description here',
//    merchantUsers: [],
//    map: {} 
//  }
```

Create a flat object and provide a prefix to each key

```
var flattened2 = flatulence.flatten(
    { a: 1, b: { c: 1, d: [ 1, 2, 3 ] } }, 
    'my.prefix.key'
)
//{ 
//  'my.prefix.key.a': 1,
//  'my.prefix.key.b.c': 1,
//  'my.prefix.key.b.d[0]': 1,
//  'my.prefix.key.b.d[1]': 2,
//  'my.prefix.key.b.d[2]': 3 
//}
```

### Unflatten

In order to transform a flat object to a regular, nested JS object again you can do the following:

```
const regular = flatulence.unflatten(flattened)
// { a: 1, b: { c: 1, d: [ 1, 2, 3 ] } }
```


Only unflatten a sub object
```
const b = flatulence.unflatten(flattened, 'b')
// { c: 1, d: [ 1, 2, 3 ] }
```

Sub objects can even be arrays
```
const array = flatulence.unflatten(flattened, 'b.d')
// [ 1, 2, 3 ]
```


## Testing

```bash
npm test
```