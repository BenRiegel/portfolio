import Dispatcher from '../Dispatcher';
import firebase from "../Firebase";
import {convertObjToArray, wait} from "../Utils";


var BlogActions = (function() {


  //private, configurable constants --------------------------------------------

  const MIN_WAIT_TIME = 1000;


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

    updateFilter: function(tagName){
      Dispatcher.dispatch({actionType:"UPDATE_FILTER", payload:tagName});
    },

  };

})();

export default BlogActions;
