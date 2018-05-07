import Dispatcher from './Dispatcher';
import { EventEmitter } from 'fbemitter';


var DatabaseStore = (function(){

  var emitter = new EventEmitter();

  var registerToActions = function(action){
    switch(action.actionType) {
      case "POSTS_RECEIVED":
        emitter.emit("POSTS_RECEIVED", action.payload);
        break;
      case "POST_INFO_RECEIVED":
        emitter.emit("POST_INFO_RECEIVED", action.payload);
        break;
      case "COMMENTS_RECEIVED":
        emitter.emit("COMMENTS_RECEIVED", action.payload);
        break;
      case "SUBMIT_COMMENT_RESULT":
        emitter.emit("SUBMIT_COMMENT_RESULT", action.payload);
        break;
      default:
        break;
    }
  }

  Dispatcher.register(registerToActions);


  //public api -----------------------------------------------------------------

  return {

    addPostsListener: function(cb){
      return emitter.addListener("POSTS_RECEIVED", cb);
    },

    addPostInfoListener: function(cb){
      return emitter.addListener("POST_INFO_RECEIVED", cb);
    },

    addCommentsListener: function(cb){
      return emitter.addListener("COMMENTS_RECEIVED", cb);
    },

    addSubmitCommentResultListener: function(cb){
      return emitter.addListener("SUBMIT_COMMENT_RESULT", cb);
    }

  }

})();


export default DatabaseStore;
