import Dispatcher from '../Dispatcher';
import NewEventEmitter from '../EventEmitter';


var BlogStore = (function(){

  //private variables ----------------------------------------------------------

  var state;
  var emitter;


  //private functions ----------------------------------------------------------

  var updatePostInfo = function(newInfo){
    state.postInfo = newInfo;
  }

  var registerToActions = function(action){
    switch(action.actionType) {
      case "POST_INFO_RECEIVED":
        updatePostInfo(action.payload);
        state.loadingStatus = "done";
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
        postInfo: null,
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
