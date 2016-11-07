const assert = require('assert')
const fl     = require('../lib')
const data   = require('./data')
const fp     = require('lodash/fp')

describe('flatulence', () => {
  
  describe('#deflate()', () => {
    it('should flatten object', () => {
      const flattened = fl.deflate(data)

      console.log(flattened)
      
      assert.equal(flattened['array[0][1]'], 1)
    })

    it('should use prefix arg if provided', () => {
      const prefix = 'this.is.my.custom.prefix'
      const flattened = fl.deflate(
        { 
          id: 'anid', 
          map: { a:1, b:2, c:3} 
        }, 
        prefix
      )

      console.log(flattened)
      
      assert.equal(flattened[prefix + '.id'], 'anid')
      assert.equal(flattened[prefix + '.map.a'], 1)
    })
  })

  describe('#inflate()', () => {
    it('should reverse flattened object to an inflated one', () => {
      const flattened = fl.flatten(data)
      const inflated = fl.unflatten(flattened)

      assert.deepEqual(data, inflated)

    })

    it('should reverse flattened object to an inflated one at a prefix', () => {
      const flattened = fl.deflate(data)
      const inflated = fl.inflate(flattened, 'cc')

      assert.deepEqual(data.cc, inflated)

    })
  })
})