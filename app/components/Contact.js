import React, { Component } from 'react';
import Form from './Form';
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

  formSubmitHandler(e, fieldData){
    e.preventDefault();

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
  };

  render() {
    const formComponents = {
      "inputRows": [
        {type:"text", name:"name", label:"Name", required:true},
        {type:"email", name:"email", label:"Email", required:true},
        {type:"text", name:"subject", label:"Subject", required:false},
        {type:"textarea", name:"message", label:"Message",required:true}
      ],
      "submitButton": {text:"Send Message"}
    };

    return (
      <div>
        <h2>Send Me a Message!</h2>
        <Form id={styles["contact-form"]}
              formComponents={formComponents}
              onSubmit={this.formSubmitHandler}>
        </Form>
      </div>
    );
  }
}

export default Contact;
