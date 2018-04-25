import React, { Component } from 'react';
import FormStore from '../services/FormStore';
import styles from '../stylesheets/InputField.css';


class InputField extends Component {

  constructor (props) {
    super(props);
    this.state = {
      fieldValue: "",
      fieldValid: false,
    }
    this.submitListener = null;
  }

  onClear(){
    this.setState({fieldValue:"", fieldValid:false}, () => { this.broadcast()});
  }

  broadcast(){
    this.props.onValueChange(this.props.name, this.state.fieldValue, this.state.fieldValid);
  }

  validateField(){
    var value = this.state.fieldValue;
    var newFieldValid = true;
    if (this.props.required){
      switch(this.props.type){
        case "text":
        case "textarea":
          newFieldValid = Boolean(value);
          break;
        case "email":
          newFieldValid = Boolean(value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i));
          break;
        default:
          break;
      }
    }
    this.setState({fieldValid: newFieldValid}, () => { this.broadcast() });
  }

  handleUserInput(evt){
    this.setState({fieldValue: evt.target.value}, () => { this.validateField() });
  }

  renderTextArea(){
    return (
      <textarea className={styles.textarea}
                name={this.props.name}
                value={this.state.fieldValue}
                onChange={(evt) => this.handleUserInput(evt)}
      />
    );
  }

  renderTextInput(){
    return (
      <input className={styles.input}
             type={this.props.type}
             name={this.props.name}
             value={this.state.fieldValue}
             onChange={(evt) => this.handleUserInput(evt)}
      />
    );
  }

  renderInputField(){
    return (this.props.type === "textarea") ? this.renderTextArea() : this.renderTextInput();
  }

  renderAsterisk(){
    if (this.props.required){
      return (
        <span className={styles["required-ast"]}> *</span>
      );
    }
  }

  renderErrors(){
    if (this.props.required && this.props.formSubmitted && !this.state.fieldValid){
      return (
        <div className={styles.errors}>Please enter a valid {this.props.name}</div>
      );
    }
  }

  componentWillMount() {
    this.submitListener = FormStore.addSubmitListener(() => this.onClear());
  }

  componentWillUnmount() {
    this.submitListener.remove();
  }

  render() {
    return (
      <div>
        <label className={styles.label}>
          {this.props.label}{this.renderAsterisk()}
        </label>
        {this.renderInputField()}
        {this.renderErrors()}
      </div>
    );
  }
}


export default InputField;
