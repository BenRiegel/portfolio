import Dispatcher from '../Dispatcher';
import firebase from "../Firebase";
import mdConvertor from '../Showdown.js';
import {convertObjToArray, wait} from "../Utils";


var BlogActions = (function() {


  //private, configurable constants --------------------------------------------

  const MIN_WAIT_TIME = 750;


  //public api -----------------------------------------------------------------

  return {

    async requestPostInfo(postId){
      var post;
      await wait(MIN_WAIT_TIME, async ()=>{
        var postRef = firebase.database().ref().child(`posts/${postId}`);
        const snapshot = await postRef.once('value');
        post = snapshot.val();
        var response = await fetch(`/blog_posts/${post.fileName}`);
        var data = await response.text();
        var html = mdConvertor.makeHtml(data);
        post.html = html;
      });
      Dispatcher.dispatch({actionType:"POST_INFO_RECEIVED", payload:post});
    },

    requestComments: function(postId){
      var commentsRef = firebase.database().ref().child("comments").orderByChild("postId").equalTo(postId);
      commentsRef.once('value').then( (snapshot) => {
        var commentsObj = snapshot.val();
        var commentsArray = convertObjToArray(commentsObj);
        Dispatcher.dispatch({actionType:"COMMENTS_RECEIVED", payload:commentsArray});
      });
    },

    addComment: function(username, comment, postId){
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

export default BlogActions;
