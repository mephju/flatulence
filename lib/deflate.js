'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _deflate = {
  deflate: function deflate(subject) {
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var result = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


    if (subject !== null && (typeof subject === 'undefined' ? 'undefined' : _typeof(subject)) === 'object') {

      for (var key in subject) {
        _deflate.deflate(subject[key], appendKey(prefix, key, Array.isArray(subject)), result);
      }
      return result;
    }

    result[removeTrailingDot(prefix)] = subject;

    return result;
  }
};

var last = function last(string) {
  return string.charAt(string.length - 1);
};

var removeTrailingDot = function removeTrailingDot(prefix) {
  var lastIdx = prefix.length - 1;
  return last(prefix) === '.' ? prefix.substring(0, lastIdx) : prefix;
};

var appendKey = function appendKey(prefix, key) {
  var isArrayElement = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (isArrayElement) {
    return removeTrailingDot(prefix) + '[' + key + ']';
  }

  return !!prefix ? prefix + '.' + key : key;
};

module.exports = _deflate.deflate;