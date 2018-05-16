import React, { Component } from 'react';
import FormActions from '../services/actions/FormActions';
import styles from '../stylesheets/FormField.css';


class FormField extends Component {

  handleUserInput(evt){
    FormActions.fieldUpdated(evt.target.dataset.index, evt.target.value);
  }

  renderAsterisk() {
    if (this.props.required){
      return (
        <span className={styles["required-ast"]}> *</span>
      );
    }
  }

  renderLabel() {
    return (
      <label className={styles.label}>
        {this.props.label}{this.renderAsterisk()}
      </label>
    );
  }

  renderTextArea() {
    return (
      <textarea className={styles.textarea}
                data-index={this.props.index}
                value={this.props.value}
                onChange={this.handleUserInput}
      />
    );
  }

  renderTextInput() {
    return (
      <input className={styles.input}
             type={this.props.type}
             data-index={this.props.index}
             value={this.props.value}
             onChange={this.handleUserInput}
      />
    );
  }

  renderUserInput() {
    if (this.props.type === "textarea"){
      return this.renderTextArea();
    } else {
      return this.renderTextInput();
    }
  }

  renderError(message, i){
    return (
      <div className={styles.errors} key={i}>{message}</div>
    );
  }

  renderErrors(){
    var errorMessages = [];
    if (this.props.showErrors){
      this.props.errors.forEach( (error, i) => {
        var errorMessage = this.renderError(error, i);
        errorMessages.push(errorMessage);
      });
      return errorMessages;
    }
  }

  render() {
    return (
      <div>
        {this.renderLabel()}
        {this.renderUserInput()}
        {this.renderErrors()}
      </div>
    );
  }
}


export default FormField;
