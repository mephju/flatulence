'use strict';

var DEBUG = false;

var inflate = {
  inflate: function inflate(map) {
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var result = arguments[2];


    if (!result) {
      if (pointsAtArray(map, prefix)) result = [];else result = {};
    }

    var subMap = buildMatchingMap(map, prefix);

    DEBUG && console.log('subMap', prefix, subMap);

    Object.keys(subMap).forEach(function (path) {
      return setAtPath(path, subMap[path], result);
    });

    return result;
  }
};

var pointsAtArray = function pointsAtArray(map, prefix) {
  var key = Object.keys(map).find(function (key) {
    return key.startsWith(prefix);
  });
  return key && key.charAt(prefix.length) === '[';
};

// Returns an object with all key-value pairs 
// matching the given prefix
var buildMatchingMap = function buildMatchingMap(map, prefix) {
  return Object.keys(map).reduce(function (result, key) {
    if (key.startsWith(prefix)) {
      result[key.substring(prefix.length)] = map[key];
    }
    return result;
  }, {});
};

// Sets the value on result. Location of value is defined by the
// provided path.
var setAtPath = function setAtPath(path, value, result) {

  var keys = path.split(setAtPath.regex).filter(function (k) {
    return !!k;
  });
  return setRec(keys, value, result);
};
setAtPath.regex = /\.|(\[\d\])/;

//
var setRec = function setRec(keys, finalValue, result) {

  DEBUG && console.log('setRec', keys, finalValue);

  if (keys.length) {
    var key = keys.shift();
    var cleanedKey = cleanKey(key);

    var currentValue = result[cleanedKey];
    if (!currentValue) {
      var nextKey = keys[0];
      result[cleanedKey] = getNextValue(cleanedKey, nextKey, finalValue);
    }
    return setRec(keys, finalValue, result[cleanedKey]);
  }

  return result;
};

var cleanKey = function cleanKey(key) {
  return key.startsWith('[') ? key.substring(1, key.length - 1) : key;
};

var getNextValue = function getNextValue(key, nextKey, finalValue) {
  return nextKey ? nextKey.startsWith('[') ? [] : {} : finalValue;
};

module.exports = inflate.inflate;