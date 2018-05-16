import Dispatcher from '../Dispatcher';
import firebase from "../Firebase";
import mdConvertor from '../Showdown.js';


var BlogActions = (function() {

  const MIN_WAIT_TIME = 750;

  //private functions ----------------------------------------------------------

  //both duplicates
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






/*      fetch(fn).then( (response) => {
        response.text().then( (data) => {
          var html = ;
          console.log("blog post data received ");
          this.setState({
            postLoaded: true,
            author: post.author,
            datePublished: post.datePublished,
            title: post.title,
            content: html,
          });
        });
      });*/


/*      postRef.once('value').then( (snapshot) => {
        var post = snapshot.val();
        Dispatcher.dispatch({actionType:"POST_INFO_RECEIVED", payload:post});
      });*/
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

export default BlogActions;
