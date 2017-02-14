const deflate = {
  
  flatten(subject, prefix = '', result = {}, keepEmptyObjects = false) {
    
    if(subject !== null && typeof subject === 'object') {

      const keys = Object.keys(subject)

      if(!keys.length && keepEmptyObjects) {
        result[prefix] = subject
        return result
      } 
      
      keys.forEach(key => deflate.flatten(
        subject[key], 
        appendKey(prefix, key, Array.isArray(subject)),
        result,
        keepEmptyObjects,
      ))
              
      return result
    }

    result[removeTrailingDot(prefix)] = subject

    return result
  },

}

deflate.flatten.keepEmpty = (subject, prefix = '', result = {}) => {
  const keepEmptyObjects = true

  return deflate.flatten(subject, prefix, result, keepEmptyObjects)
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

module.exports = deflate.flatten