import React, { Component } from 'react';
import Form from './Form';
import FormActions from '../services/actions/FormActions';
import styles from '../stylesheets/Contact.scss';


//------------------------------------------------------------------------------

const FORM_COMPONENTS = {
  "fields": [
    {type:"text", name:"name", label:"Name", required:true, defaultValue:""},
    {type:"email", name:"email", label:"Email", required:true, defaultValue:""},
    {type:"text", name:"subject", label:"Subject", required:false, defaultValue:""},
    {type:"textarea", name:"message", label:"Message", required:true, defaultValue:""}
  ],
  "submitButton": {text:"Send Message"},
};


//------------------------------------------------------------------------------

class Contact extends Component {

  async submitFunction(data){
    const MIN_WAIT_TIME = 1000;
    var options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({ "Content-Type": "application/json" }),
    }
    var startTimeStamp = new Date().getTime();
    const response = await fetch('http://localhost:8080/contact', options);
    var endTimeStamp = new Date().getTime();
    var timeDiff = endTimeStamp - startTimeStamp;
    var pauseLength = Math.max(0, MIN_WAIT_TIME - timeDiff);
    setTimeout( ()=>{
      if (response.ok){
        FormActions.formSubmissionSuccess();
      } else {
        FormActions.formSubmissionFailure();
      }
    }, pauseLength);
  }

  clickHandler(evt){
    FormActions.resetting();
  }

  renderSuccessPage(){
    return (
      <div>
        Success!
        <button className={styles.button}
                onClick={()=>this.clickHandler()}>
          OK
        </button>
      </div>
    );
  }

  renderFailurePage(){
    return(
      <div>
        Oops!
        <button className={styles.button}
                onClick={()=>this.clickHandler()}>
          Try Again
        </button>
      </div>
    );
  }
//    <FormField type="text" name="email" label="Email" required={false}/>

  render() {
    return (
      <div>
        <h2>Send Me a Message</h2>
        <Form className={styles["contact-form"]}
              formComponents={FORM_COMPONENTS}
              submitFunction={(data) => this.submitFunction(data)}
              successComponent={this.renderSuccessPage()}
              failureComponent={this.renderFailurePage()}>
        </Form>
      </div>
    );
  }
}

export default Contact;
