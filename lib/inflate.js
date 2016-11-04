const regex = /\.|(\[\d\])/

const DEBUG = false

const inflate = {

  inflate(map, prefix = '', result = {}) {
    const subMap = buildSubMap(map, prefix) 
    
    Object.keys(subMap).forEach(
      path => setAtPath(path, subMap[path], result)
    )

    return result
  }

}

const buildSubMap = (map, prefix) => {
  return Object.keys(map).reduce((result, key) => {
    if(key.startsWith(prefix)) {
      result[key.substring(prefix.length + 1)] = map[key]
    }
    return result
  }, {})
}

const setAtPath = (path, value, result) => {
  
  const keys = path.split(regex).filter(k => !!k)
  return setRec(keys, value, result)
}


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