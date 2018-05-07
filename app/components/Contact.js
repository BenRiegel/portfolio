import React, { Component } from 'react';
import Form from './Form';
import FormStore from '../services/FormStore';
import styles from '../stylesheets/Contact.css';


function logResult(result) {
  console.log(result);
}

function logError(error) {
  console.log('Looks like there was a problem: \n', error);
}

function validateResponse(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

function readResponseAsJSON(response) {
  return response.json();
}


class Contact extends Component {

  constructor (props) {
    super(props);
    this.formComponents = {
      "fields": [
        {type:"text", name:"name", label:"Name", required:true},
        {type:"email", name:"email", label:"Email", required:true},
        {type:"text", name:"subject", label:"Subject", required:false},
        {type:"textarea", name:"message", label:"Message",required:true}
      ],
      "submitButton": {text:"Send Message"}
    };
    this.submitValidHandlerRef = null;
  }

  componentDidMount() {
    this.submitValidHandlerRef = FormStore.addListener("FORM_VALID_ON_SUBMISSION", (fieldData) => {
      var data = {};
      for(var name in fieldData) {
        data[name] = fieldData[name].value;
      }
      fetch("http://localhost:8080/contact", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({ "Content-Type": "application/json" })
      }).then(validateResponse)
        .then(readResponseAsJSON)
        .then(logResult)
        .catch(logError);
    });
  }

  componentWillUnmount() {
    this.submitValidHandlerRef.remove();
  }

  render() {
    return (
      <div>
        <h2>Send Me a Message</h2>
        <Form className={styles["contact-form"]}
              formComponents={this.formComponents}>
        </Form>
      </div>
    );
  }
}

export default Contact;
