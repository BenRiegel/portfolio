import React, { Component } from 'react';
import FormStore from '../services/FormStore';
import FormActions from '../services/FormActions';
import styles from '../stylesheets/UserInput.css';


class UserInput extends Component {

  constructor (props) {
    super(props);
    this.ref = null;
    this.successfulSubmitHandlerRef = null;
  }

  clear() {
    this.ref.value = "";
  }

  validateField(newValue){
    var newFieldValid = true;
    if (this.props.required){
      switch(this.props.type){
        case "text":
        case "textarea":
          newFieldValid = Boolean(newValue);
          break;
        case "email":
          newFieldValid = Boolean(newValue.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i));
          break;
        default:
          break;
      }
    }
    return {valid: newFieldValid};
  }

  handleUserInput(evt) {
    var newValue = evt.target.value;
    var validationInfo = this.validateField(newValue);
    FormActions.fieldUpdated({
      name: this.props.name,
      value: evt.target.value,
      valid: validationInfo.valid,
      errors: null,
    });
  }

  componentDidMount() {
    this.successfulSubmitHandlerRef = FormStore.addListener("SUCCESSFUL_SUBMIT", () => {
      console.log("here");
      this.clear();
    });
  }

  componentWillUnmount() {
    this.successfulSubmitHandlerRef.remove();
  }

  renderTextArea() {
    return (
      <textarea className={styles.textarea}
                ref={domNode => this.ref = domNode}
                onChange={(evt) => this.handleUserInput(evt)}
      />
    );
  }

  renderTextInput() {
    return (
      <input className={styles.input}
             type={this.props.type}
             ref={domNode => this.ref = domNode}
             onChange={(evt) => this.handleUserInput(evt)}
      />
    );
  }

  render() {
    if (this.props.type === "textarea"){
      return this.renderTextArea();
    } else {
      return this.renderTextInput();
    }
  }
}


export default UserInput;
