import Dispatcher from '../Dispatcher';
import NewEventEmitter from '../EventEmitter';


var BlogStore = (function(){

  //private variables ----------------------------------------------------------

  var state;
  var emitter;


  //private functions ----------------------------------------------------------

  var updatePosts = function(newPosts){
    state.posts = newPosts;
  }

  var updateTagCounts = function(){
    state.tags = {};
    state.posts.forEach( (post) => {
      var tags = post.tags;
      tags.forEach( (tag) => {
        if (tag in state.tags){
          state.tags[tag] += 1;
        } else {
          state.tags[tag] = 1;
        }
      });
    });
  }

  var registerToActions = function(action){
    switch(action.actionType) {
      case "POSTS_RECEIVED":
        updatePosts(action.payload);
        updateTagCounts();
        state.loadingStatus = "done";
        break;
      case "UPDATE_FILTER":
        state.filter = action.payload;
        break;
      default:
        break;
    }
    emitter.broadcast();
  }


  //private code block ---------------------------------------------------------

  emitter = NewEventEmitter();

  Dispatcher.register(registerToActions);


  //public api -------------------------------------------------------------------

  return {

    addListener: function(source, cb) {
      emitter.addListener(source, cb);
    },

    removeListener: function(source){
      emitter.removeListener(source);
    },

    initState: function(){
      state = {
        posts: [],
        tags: [],
        filter: null,
        loadingStatus: "loading",
      }
      return state;
    },

    getState: function(){
      return state;
    },
  };

})();


export default BlogStore;
