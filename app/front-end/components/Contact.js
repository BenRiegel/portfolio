import React, { Component } from 'react';
import Form from './Form.js';
import Input from './Input.js';
import PageTemplate from './PageTemplate.js';
import SubmitButton from './SubmitButton.js';



//import FormActions from '../services/actions/FormActions';
import {wait} from '../services/Utils';
import styles from '../stylesheets/Contact.scss';


//------------------------------------------------------------------------------

class Contact extends Component {

  constructor(props) {
    super(props);
    this.state = {
      submissionStatus: null,
      emailSuccessful: null,
    }
    this.submitFunction = this.submitFunction.bind(this);
  }

  async submitFunction(data){
    this.setState({submissionStatus: "waiting"});

    const MIN_WAIT_TIME = 1000;
    var options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({ "Content-Type": "application/json" }),
    }
    var response;
    await wait(MIN_WAIT_TIME, async ()=>{
      response = await fetch('http://localhost:8080/contact', options);
    });
    this.setState({submissionStatus: "complete"});

    if (response.ok){
      this.setState({emailSuccessful: true});
    } else {
      this.setState({emailSuccessful: false});
    }
  }

  clickHandler(evt){
    FormActions.resetting();
  }

  renderSuccessPage(){
    return (
      <div className={styles.finishedPage}>
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

  render() {
    return (
      <PageTemplate>

        <div className={styles.socialMediaContainer}>
          <div className={styles.subTitle}>
            Via Social Media
          </div>
        </div>

        <div className={styles.formSectionContainer}>
          <div className={styles.subTitle}>
            Via Email
          </div>
          <div className={styles.formContainer}>
            <Form className={styles.contactForm}
                  submitFunction={this.submitFunction}
                  waiting={this.state.submissionStatus==="waiting"}
                  reset={this.state.emailSuccessful}>
              <Input type="text" className={styles.textInput} label="Name" required={true} />
              <Input type="email" className={styles.textInput} label="Email" required={true} />
              <Input type="text" className={styles.textInput} label="Subject" required={false} />
              <Input type="textarea" className={styles.textAreaInput} label="Message" required={true} />
              <SubmitButton className={styles.submitButton} text="Send Message" />
            </Form>
            { this.state.submissionStatus === "complete" ? this.renderSuccessPage() : null}
          </div>
        </div>

      </PageTemplate>
    );
  }
}

export default Contact;
