/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1)

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const inflate = __webpack_require__(2)
	const deflate = __webpack_require__(3)

	const flatulence = {

	  toFlatArray() { throw new Error('not implemented yet') },

	  deflate,
	  flatten: deflate,

	  inflate,
	  unflatten: inflate,
	  
	}








	module.exports = flatulence

/***/ },
/* 2 */
/***/ function(module, exports) {

	

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

/***/ },
/* 3 */
/***/ function(module, exports) {

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

/***/ }
/******/ ]);