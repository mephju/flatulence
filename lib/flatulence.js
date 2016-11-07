const inflate = require('./inflate')
const deflate = require('./deflate')

const flatulence = {

  toFlatArray() { throw new Error('not implemented yet') },

  deflate,
  flatten: deflate,

  inflate,
  unflatten: inflate,
  
}








module.exports = flatulence