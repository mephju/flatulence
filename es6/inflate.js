

const DEBUG = false

const inflate = {

  inflate(map, prefix = '', result) {

    if(!result) {
      if(pointsAtArray(map, prefix)) result = []
      else result = {}
    }
     
    const subMap = buildMatchingMap(map, prefix) 

    DEBUG && console.log('subMap', prefix, subMap)
    
    Object.keys(subMap).forEach(
      path => setAtPath(path, subMap[path], result)
    )

    return result
  }
}

const pointsAtArray = (map, prefix) => {
  const key = Object.keys(map).find(key => key.startsWith(prefix))
  return key && key.charAt(prefix.length) === '['
}


// Returns an object with all key-value pairs 
// matching the given prefix
const buildMatchingMap = (map, prefix) => {
  return Object.keys(map).reduce((result, key) => {
    if(key.startsWith(prefix)) {
      result[key.substring(prefix.length)] = map[key]
    }
    return result
  }, {})
}

// Sets the value on result. Location of value is defined by the
// provided path.
const setAtPath = (path, value, result) => {
  
  const keys = path.split(setAtPath.regex).filter(k => !!k)
  return setRec(keys, value, result)
}
setAtPath.regex = /\.|(\[\d\])/


//
const setRec = (keys, finalValue, result) => {

  DEBUG && console.log('setRec', keys, finalValue)
  
  if(keys.length) {
    const key = keys.shift()
    const cleanedKey = cleanKey(key)

    const currentValue = result[cleanedKey]
    if(!currentValue) {
      const nextKey = keys[0]
      result[cleanedKey] = getNextValue(cleanedKey, nextKey, finalValue)
    }
    return setRec(keys, finalValue, result[cleanedKey])
  }
  
  return result
}

const cleanKey = (key) => {
  return key.startsWith('[') 
  ? key.substring(1, key.length -1) 
  : key
}

const getNextValue = (key, nextKey, finalValue) => {
  return nextKey 
  ? nextKey.startsWith('[') 
    ? [] 
    : {}
  : finalValue
}

module.exports = inflate.inflate