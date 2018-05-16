import Dispatcher from '../Dispatcher';
import NewEventEmitter from '../EventEmitter';
import validateField from '../FormValidationRules';


var FormStore = (function(){

  //private variables ----------------------------------------------------------

  var state;
  var emitter;


  //private functions ----------------------------------------------------------

  var updateFieldValidity = function(index){
    var field = state.fields[index];
    if (field.required){
      const { type, value, name } = field;
      field["valid", "errors"] = validateField(type, value, name);
    } else {
      field["valid", "errors"] = [true, []];
    }
  }

  var updateFieldValue = function(index, value){
    state.fields[index].value = value;
  }

  var updateFormValidity = function(){
    state.formValid = state.fields.every( (field) => {
      return field.valid;
    });
  }

  var updateHasRequiredFields = function(){
    state.hasRequiredFields = state.fields.some( (field) => {
      return field.required;
    });
  }

  var resetState = function(fieldList){
    state = {
      fields: fieldList.slice(),
      hasRequiredFields: false,
      formValid: false,
      showErrors: false,
      submitStatus: null,       //combine resetting and submitStatus somehow?
      resetting: false,
    }
    state.fields.forEach( (field, i) => {
      updateFieldValue(i, field.defaultValue);
      updateFieldValidity(i);
    });
    updateFormValidity();
    updateHasRequiredFields();
  }

  var registerToActions = function(action){
    switch(action.actionType) {
      case "FIELD_UPDATED":
        updateFieldValue(action.payload.index, action.payload.value);
        updateFieldValidity(action.payload.index);
        updateFormValidity();
        break;
      case "SUBMIT_REQUEST_INVALID_FORM":
        state.showErrors = true;
        break;
      case "SUBMIT_REQUEST_VALID_FORM":
        state.submitStatus = "waiting";
        break;
      case "FORM_SUBMISSION_SUCCESS":
        resetState(state.fields);
        state.submitStatus = "success";
        break;
      case "FORM_SUBMISSION_FAILURE":
        state.submitStatus = "failure";
        break;
      case "RESETTING":
        state.resetting = true;
        break;
      case "DONE":
        state.resetting = false;
        state.submitStatus = null;
        break;
      default:
        break;
    }
    emitter.broadcast();
  };


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

    initState: function(fieldList){
      resetState(fieldList);
      return state;
    },

    getState: function(){
      return state;
    },

  };

})();


export default FormStore;
