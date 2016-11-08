const deflate = {
  
  deflate(subject, prefix = '', result = {}) {
    
    if(subject !== null && typeof subject === 'object') {
      
      for(var key in subject) {
        deflate.deflate(
          subject[key], 
          appendKey(prefix, key, Array.isArray(subject)),
          result
        )
      }
      return result
    }

    result[removeTrailingDot(prefix)] = subject

    return result
  }

}

const last = string => string.charAt(string.length - 1)

const removeTrailingDot = prefix => {
  const lastIdx = prefix.length - 1
  return last(prefix) === '.' 
  ? prefix.substring(0, lastIdx)
  : prefix
}

const appendKey = (prefix, key, isArrayElement = false) => {
  if(isArrayElement) {
    return removeTrailingDot(prefix) + '[' + key + ']'
  }
  
  return !!prefix ? (prefix + '.' + key) : key
  
}

module.exports = deflate.deflate