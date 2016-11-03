const flattenObject = (subject, prefix = '', result = {}) => {

  if(subject !== null && typeof subject === 'object') {
    
    for(var key in subject) {
       flattenObject(
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

export default flattenObject