import Dispatcher from './Dispatcher';
import { EventEmitter } from 'fbemitter';


var FormStore = (function(){

  //private variables ----------------------------------------------------------

  var fields;
  var formValid;
  var emitter;


  //private functions ----------------------------------------------------------

  var submit = function(){
    if (formValid){
      emitter.emit("FORM_VALID_ON_SUBMISSION", fields);
    } else {
      emitter.emit("FORM_INVALID_ON_SUBMISSION");
    }
  };

  var checkFormValid = function(){
    formValid = true;
    for (let key in fields){
      formValid = formValid && fields[key].valid;
    }
  };

  var updateField = function(fieldInfo){
    var oldValidState = fields[fieldInfo.name].valid;
    fields[fieldInfo.name] = {
      value: fieldInfo.value,
      valid: fieldInfo.valid,
      errors: fieldInfo.errors,
    }
    if (fieldInfo.valid !== oldValidState){
      var eventName = fieldInfo.name + "UpdatedValidation";
      emitter.emit(eventName, {valid:fieldInfo.valid, errors:fieldInfo.errors});
    }
  }

  var registerToActions = function(action){
    switch(action.actionType) {
      case "SUBMIT_REQUEST":
        submit();
        break;
      case "FIELD_UPDATED":
        updateField(action.payload);
        checkFormValid();
        break;
      case "SUCCESSFUL_SUBMIT":
        console.log("here form store");
        emitter.emit("SUCCESSFUL_SUBMIT");
        break;
      default:
        break;
    }
  };


  //private code block ---------------------------------------------------------

  emitter = new EventEmitter();
  Dispatcher.register(registerToActions);


  //public api -----------------------------------------------------------------

  return {

    addListener: function(eventName, cb) {
      return emitter.addListener(eventName, cb);
    },

    init: function(fieldsArray) {
      fields = {};
      formValid = true;
      fieldsArray.forEach( (field) => {
        fields[field.name] = {
          value: "",
          valid: !field.required
        };
        formValid = formValid && !field.required;
      });
      return !(formValid);
    },

  };

})();


export default FormStore;
