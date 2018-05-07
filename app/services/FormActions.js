import Dispatcher from './Dispatcher';


//get rid of class here
class FormActions {

  submit() {
    Dispatcher.dispatch({
      actionType: "SUBMIT_REQUEST",
    });
  }

  fieldUpdated(fieldInfo) {
    Dispatcher.dispatch({
      actionType: "FIELD_UPDATED",
      payload: fieldInfo,
    });
  }

  successfulSubmit() {
    console.log("hereasdfasdf");
    Dispatcher.dispatch({
      actionType: "SUCCESSFUL_SUBMIT",
    });
  }

}

export default new FormActions();
