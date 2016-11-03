const mocha = require('mocha')
const assert = require('assert')
const fl = require('../lib')
const data = require('./data')

describe('flatulence', () => {
  describe('#flatten()', () => {
    it('should flatten object', () => {
      const flattened = fl.flatten(data)
      console.log(flattened)
    })
  })
})