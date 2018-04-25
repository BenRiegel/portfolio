import Dispatcher from './Dispatcher';
import { EventEmitter } from 'fbemitter';


var FormStore = (function(){

  var emitter = new EventEmitter();

  var registerToActions = function(action){
    switch(action.actionType) {
      case "SUBMIT":
        emitter.emit("SUBMIT", action.payload);
        break;
      default:
        break;
    }
  }

  Dispatcher.register(registerToActions);


  //public api -----------------------------------------------------------------

  return {

    addSubmitListener: function(callback) {
      return emitter.addListener("SUBMIT", callback);
    },
  }

})();


export default FormStore;
