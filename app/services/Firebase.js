import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyCGv_mpPcueMFjOUtJ4-RPBLMputiC3KVo",
  authDomain: "portfolio-fd2f2.firebaseapp.com",
  databaseURL: "https://portfolio-fd2f2.firebaseio.com",
  projectId: "portfolio-fd2f2",
  storageBucket: "portfolio-fd2f2.appspot.com",
  messagingSenderId: "558389202562"
};
firebase.initializeApp(config);



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

export {firebase, convertObjToArray};
