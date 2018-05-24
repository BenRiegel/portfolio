import Dispatcher from '../Dispatcher';
import NewEventEmitter from '../EventEmitter';


var BlogStore = (function(){

  //private variables ----------------------------------------------------------

  var stateCache;
  var state;
  var emitter;


  //private functions ----------------------------------------------------------

  var cacheState = function(){
    var postId = state.postInfo.id;
    stateCache[postId] = state;
  }

  var registerToActions = function(action){
    switch(action.actionType) {
      case "POST_INFO_RECEIVED":
        state.postInfo = action.payload;
        state.postInfoLoaded = true;
        cacheState();
        break;
      default:
        break;
    }
    emitter.broadcast();
  }


  //private code block ---------------------------------------------------------

  stateCache = {};

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

    initState: function(postId){
      state = stateCache[postId] || {postInfo: null, postInfoLoaded: false};
      return state;
    },

    getState: function(){
      return state;
    },
  };

})();


export default BlogStore;
