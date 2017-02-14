const assert = require('assert')
const fl     = require('../lib/main')
const data   = require('./data')
const fp     = require('lodash/fp')

describe('flatulence', () => {

  describe('#flatten()', () => {
    it('should flatten object', () => {
      const flattened = fl.flatten(data)

      // console.log(flattened)

      assert.equal(flattened['array[0][1]'], 1)
    })

    it('should keep empty arrays and objects', () => {

      const flattened = fl.flatten.keepEmpty({
        "name": "Mega Group 2",
        "loginId": "admin_mega_merchant_2",
        "description": "again, some description here",
        "merchantUsers": [],
        "map": {}
      })


      assert.ok(Array.isArray(flattened.merchantUsers))
      assert.ok(typeof flattened.map === 'object')
      assert.ok(!Array.isArray(flattened.map))
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

      // console.log(flattened)

      assert.equal(flattened[prefix + '.id'], 'anid')
      assert.equal(flattened[prefix + '.map.a'], 1)
    })
  })

})