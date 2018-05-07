import Dispatcher from './Dispatcher';
import firebase from "./Firebase";


var DatabaseActions = (function() {


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


  //public api -----------------------------------------------------------------

  return {

    requestPosts(){
      var postsRef = firebase.database().ref("posts");
      postsRef.once('value').then( (snapshot) => {
        var postsObj = snapshot.val();
        var postsArray = convertObjToArray(postsObj);
        postsArray.reverse();
        Dispatcher.dispatch({actionType:"POSTS_RECEIVED", payload:postsArray});
      });
    },

    requestPostInfo(postId){
      var postRef = firebase.database().ref().child(`posts/${postId}`);
      postRef.once('value').then( (snapshot) => {
        var post = snapshot.val();
        Dispatcher.dispatch({actionType:"POST_INFO_RECEIVED", payload:post});
      });
    },

    requestComments(postId){
      var commentsRef = firebase.database().ref().child("comments").orderByChild("postId").equalTo(postId);
      commentsRef.once('value').then( (snapshot) => {
        var commentsObj = snapshot.val();
        var commentsArray = convertObjToArray(commentsObj);
        Dispatcher.dispatch({actionType:"COMMENTS_RECEIVED", payload:commentsArray});
      });
    },

    addComment(username, comment, postId){
      var newCommentKey = firebase.database().ref().child('comments').push().key;
      var timeStamp = new Date();
      var updates = {};
      updates[`${newCommentKey}`] = {
        username: username,
        comment: comment,
        date: timeStamp.toDateString() + " " + timeStamp.toLocaleTimeString(),
        postId: postId,
      }
      firebase.database().ref().child('comments').update(updates, (error) => {
        Dispatcher.dispatch({
          actionType: "SUBMIT_COMMENT_RESULT",
          payload: {error:error, commentKey:newCommentKey},
        });
      });
    },

  };

})();

export default DatabaseActions;
