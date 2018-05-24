import Dispatcher from '../Dispatcher';
import NewEventEmitter from '../EventEmitter';


var BlogStore = (function(){

  //private variables ----------------------------------------------------------

  var state;
  var emitter;


  //private functions ----------------------------------------------------------

  var registerToActions = function(action){
    switch(action.actionType) {
      case "POSTS_RECEIVED":
        state.posts = action.payload;
        state.postsLoaded = true;
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

    addListener: function(cb) {
      emitter.addListener(cb);
    },

    removeListener: function(cb){
      emitter.removeListener(cb);
    },

    initState: function(){
      state = state || {posts:null, filter:null, postsLoaded:false};
      return state;
    },

    getState: function(){
      return state;
    },
  };

})();


export default BlogStore;
