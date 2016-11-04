const deflate = {
  
  deflate(subject, prefix = '', result = {}) {

    if(subject !== null && typeof subject === 'object') {
      
      for(var key in subject) {
        deflate.deflate(
          subject[key], 
          extendPrefix(prefix, key, Array.isArray(subject)),
          result
        )
      }
      return result
    }
    result[removeTrailingDot(prefix)] = subject
    return result
  }

}

const removeTrailingDot = prefix => {
  const lastIdx = prefix.length - 1
  return prefix.charAt(lastIdx) === '.' 
  ? prefix.substring(0, lastIdx)
  : prefix
}

const extendPrefix = (prefix, key, isArrayElement = false) => {
  return isArrayElement
  ? removeTrailingDot(prefix) + '[' + key + '].'
  : prefix + key + '.'
}

module.exports = deflate.deflate