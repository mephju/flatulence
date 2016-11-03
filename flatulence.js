const flatulence = (subject, prefix = '', result = {}) => {

  if(subject !== null && typeof subject === 'object') {
    
    for(var key in subject) {
       flatulence(
        subject[key], 
        prefix + '.' + key 
        result,
      )
    }
    return result
  }
  result[prefix.substring(1)] = subject
  return result

}

module.exports = flatulence