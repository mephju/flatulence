const assert = require('assert')
const fl     = require('../lib/main')
const data   = require('./data')
const fp     = require('lodash/fp')

describe('flatulence', () => {

  describe('#unflatten()', () => {
    it('should reverse flattened object to an unflattened one', () => {
      const flattened = fl.flatten(data)
      const unflattened = fl.unflatten(flattened)

      assert.deepEqual(data, unflattened)

    })

    it('should reverse a flattened object to an unflattened subobject starting at prefix', () => {
      const flattened = fl.flatten(data)
      const unflattened = fl.unflatten(flattened, 'cc')
      assert.deepEqual(data.cc, unflattened)

    })

    it('should produce an unflat array when prefix points at array', () => {
      const flattened = fl.flatten(data)

      const unflattened = fl.unflatten(flattened, 'cc.contract.multiContractSetup')

      assert.ok(Array.isArray(unflattened))

    })
  })
})