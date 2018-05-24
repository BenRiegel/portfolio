var convertObjToArray = function(obj){
  if (obj === null){
    return [];
  }
  var newArray = [];
  var keys = Object.keys(obj);
  keys.forEach(function(key){
    var value = obj[key];
    value.key = key;
    newArray.push(value);
  });
  return newArray;
}

var wait = function(minPauseTime, doFunction){
  var startTimeStamp = new Date().getTime();
  doFunction();
  var endTimeStamp = new Date().getTime();
  var timeDiff = endTimeStamp - startTimeStamp;
  var pauseLength = Math.max(0, minPauseTime - timeDiff);
  return new Promise( (resolve, reject) => {
    setTimeout( ()=>{
      resolve();
    }, pauseLength);
  });
}

export {convertObjToArray, wait};
