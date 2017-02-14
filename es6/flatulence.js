const unflatten = require('./unflatten')
const flatten = require('./flatten')

const flatulence = {

  toFlatArray() { throw new Error('not implemented yet') },

  deflate: flatten,
  flatten,

  inflate: unflatten,
  unflatten,

}








module.exports = flatulence