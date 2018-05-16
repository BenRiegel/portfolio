import Dispatcher from '../Dispatcher';
import firebase from "../Firebase";


var BlogActions = (function() {


  const MIN_WAIT_TIME = 1750;

  //private functions ----------------------------------------------------------

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


  //public api -----------------------------------------------------------------

  return {

    async requestPosts(){
      var postsArray;
      await wait(MIN_WAIT_TIME, async ()=>{
        var postsRef = firebase.database().ref("posts");
        const snapshot = await postsRef.once('value');
        var postsObj = snapshot.val();
        postsArray = convertObjToArray(postsObj);    //try to get rid of this?
        postsArray.reverse();
      });
      Dispatcher.dispatch({actionType:"POSTS_RECEIVED", payload:postsArray})
    },

    updateFilter(tagName){
      Dispatcher.dispatch({actionType:"UPDATE_FILTER", payload:tagName});
    },

  };

})();

export default BlogActions;
