import Dispatcher from '../Dispatcher';


class FormActions {

  done(){
    Dispatcher.dispatch({
      actionType: "DONE",
    });
  }

  resetting(){
    Dispatcher.dispatch({
      actionType: "RESETTING",
    });
  }

  formSubmissionSuccess(){
    Dispatcher.dispatch({
      actionType: "FORM_SUBMISSION_SUCCESS",
    });
  }

  formSubmissionFailure(){
    Dispatcher.dispatch({
      actionType: "FORM_SUBMISSION_FAILURE",
    });
  }

  submitValidForm() {
    Dispatcher.dispatch({
      actionType: "SUBMIT_REQUEST_VALID_FORM",
    });
  }

  submitInvalidForm() {
    Dispatcher.dispatch({
      actionType: "SUBMIT_REQUEST_INVALID_FORM",
    });
  }

  fieldUpdated(index, value) {
    Dispatcher.dispatch({
      actionType: "FIELD_UPDATED",
      payload: {index, value},
    });
  }

}

export default new FormActions();
