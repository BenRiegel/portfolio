import Dispatcher from '../Dispatcher';


var FormActions = (function() {


  //public api -----------------------------------------------------------------

  return {

    done: function(){
      Dispatcher.dispatch({
        actionType: "DONE",
      });
    },

    resetting: function(){
      Dispatcher.dispatch({
        actionType: "RESETTING",
      });
    },

    formSubmissionSuccess: function(){
      Dispatcher.dispatch({
        actionType: "FORM_SUBMISSION_SUCCESS",
      });
    },

    formSubmissionFailure: function(){
      Dispatcher.dispatch({
        actionType: "FORM_SUBMISSION_FAILURE",
      });
    },

    submitValidForm: function() {
      Dispatcher.dispatch({
        actionType: "SUBMIT_REQUEST_VALID_FORM",
      });
    },

    submitInvalidForm: function() {
      Dispatcher.dispatch({
        actionType: "SUBMIT_REQUEST_INVALID_FORM",
      });
    },

    fieldUpdated: function(index, value) {
      Dispatcher.dispatch({
        actionType: "FIELD_UPDATED",
        payload: {index, value},
      });
    }

  };

})();

export default FormActions;
