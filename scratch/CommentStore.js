import Dispatcher from '../Dispatcher';
import NewEventEmitter from '../EventEmitter';


var NewFormStore = function(formComponents){


  //private variables ----------------------------------------------------------

  var state;
  var emitter;


  //private functions ----------------------------------------------------------

  var initState = function(){
    state = {
      fields: [],
      hasRequiredFields: false,
      formValid: false,
      showErrors: false,
      submitStatus: null,
      resetting: false,
    }
    state.fields = formComponents.map( (component, index) => {
      component.value = "";
      component.valid = false;
      return component;
    });
    state.fields.forEach( (field, i)=>{
      updateFieldValidity(i)
    });
    updateFormValidity();
    state.hasRequiredFields = !state.formValid;
  };

  var updateFieldValue = function(index, value){
    state.fields[index].value = value;
  }

  var updateFieldValidity = function(index){
    var field = state.fields[index];
    field.valid = true;  //need?
    field.errors = [];
    if (field.required){
      switch(field.type){
        case "text":
        case "textarea":
          field.valid = Boolean(field.value);
          if (!field.valid){
            field.errors.push(`Please enter a ${field.name}`);
          }
          break;
        case "email":
          field.valid = Boolean(field.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i));
          if (!field.valid){
            field.errors.push(`Please enter a valid ${field.name}`);
          }
          break;
        default:
          break;
      }
    }
  }

  var updateFormValidity = function(){
    state.formValid = true;
    state.fields.forEach( (field) => {
      state.formValid = state.formValid && field.valid;
    });
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
        initState();
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
    emitter.broadcast("CHANGE");
  };


  //private code block ---------------------------------------------------------

  initState();

  emitter = NewEventEmitter();

  Dispatcher.register(registerToActions);


  //public api -------------------------------------------------------------------

  return {

    addListener: function(source, cb) {
      emitter.addListener(source, cb);
    },

    getState: function(){
      return state;
    },

    removeListener: function(source){
      emitter.removeListener(source);
    }

  };

};


export default NewFormStore;
