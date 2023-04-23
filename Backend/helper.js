function isEmpty(obj) {
  for (let key in obj) {
   
    if (!obj[key] || typeof obj[key] === 'boolean') {
        continue;
      }
    if (typeof obj[key] == "string") {
      if (obj[key] === "") {
        
        return true;
      }
    }
    
  }
  return false;
}

module.exports = isEmpty;
