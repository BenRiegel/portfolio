import Dispatcher from './Dispatcher';


class FormActions {

  submit() {
        // Note: This is usually a good place to do API calls.
    Dispatcher.dispatch({
      actionType: "SUBMIT",
    });
  }

}

export default new FormActions();
