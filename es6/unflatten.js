

const DEBUG = true


module.exports = function unflatten(map, prefix = '', result) {

  const entries = Object
  .entries(map)
  .filter(([key]) => key.startsWith(prefix))

  if(!result) { result = prepareResult(entries[0], prefix) }

  return entries
  .map(([key, value]) => [cutPrefix(key, prefix), value])
  .reduce(setAtPath, result)

}


export const isArray = (entry, prefix) => {
  return entry && entry[0] && entry[0].charAt(prefix.length) === '['
}



// Sets the value on result. Location of value is defined by the
// provided path.
export const setAtPath = (result, [path, value]) => {

  const keys = path.split(/\.|(\[\d\])/).filter(k => !!k)
  resolvePath(keys, value, result)
  return result
}


export const resolvePath = (keys, finalValue, result) => {

  // DEBUG && console.log('resolvePath', keys, finalValue, result)

  if(keys.length) {

    const key = cleanKey(keys.shift())

    if(!result[key]) {
      const nextKey = keys[0]
      result[key] = getNextValue(nextKey, finalValue)
    }
    // DEBUG && console.log('resolvePath done', keys, finalValue, result)
    return resolvePath(keys, finalValue, result[key])
  }

}

export const prepareResult = (entry, prefix) => isArray(entry, prefix) ? [] : {}
export const cutPrefix     = (key, prefix) => prefix ? key.substring(prefix.length) : key
export const cleanKey      = key => isArrayIndex(key) ? extractIndex(key) : key
export const isArrayIndex  = key => key.startsWith('[')
export const extractIndex  = key => key.substring(1, key.length -1)

export const getNextValue = (nextKey, finalValue) => {
  return nextKey
  ? isArrayIndex(nextKey)
    ? []
    : {}
  : finalValue
}

