const assert = require('assert')
const fl = require('../lib')
const data = require('./data')
const fp = require('lodash/fp')

describe('flatulence', () => {
  
  describe('#deflate()', () => {
    it('should flatten object', () => {
      const flattened = fl.deflate(data)
      
      assert.equal(flattened['array[0][1]'], 1)
    })
  })

  describe('#inflate()', () => {
    it('should reverse flattened object to an inflated one', () => {
      const flattened = fl.deflate(data)
      const inflated = fl.inflate(flattened, 'cc')

      assert.deepEqual(data.cc, inflated)

    })
  })
})