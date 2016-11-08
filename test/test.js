const assert = require('assert')
const fl     = require('../lib/main')
const data   = require('./data')
const fp     = require('lodash/fp')

describe('flatulence', () => {
  
  describe('#flatten()', () => {
    it('should flatten object', () => {
      const flattened = fl.flatten(data)

      console.log(flattened)
      
      assert.equal(flattened['array[0][1]'], 1)
    })

    it('should use prefix arg if provided', () => {
      const prefix = 'this.is.my.custom.prefix'
      const flattened = fl.flatten(
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

  describe('#unflatten()', () => {
    it('should reverse flattened object to an unflattened one', () => {
      const flattened = fl.flatten(data)
      const unflattened = fl.unflatten(flattened)

      assert.deepEqual(data, unflattened)

    })

    it('should reverse flattened object to an unflattened one at a prefix', () => {
      const flattened = fl.flatten(data)
      const unflattened = fl.unflatten(flattened, 'cc')

      assert.deepEqual(data.cc, unflattened)

    })

    it('should produce an unflat array when prefix points at array', () => {
      const flattened = fl.flatten(data)
      const unflattened = fl.unflatten(flattened, 'cc.contract.multiContractSetup')

      console.log('unflattened', unflattened)

      assert.ok(Array.isArray(unflattened))

    })
  })
})