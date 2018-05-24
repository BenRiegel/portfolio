import React, { Component } from 'react';
import styles from '../stylesheets/Input.scss';


const Asterisk = () => {
  return (
    <span className={styles.asterisk}> " *" </span>
  );
};

const Label = ( {className, text, required} ) => {
  return (
    <div className={className}>
      <span> {text} </span>
      { required ? <Asterisk /> : null}
    </div>
  );
}




class Input extends Component {

  /*handleUserInput(evt){
    FormActions.fieldUpdated(evt.target.dataset.index, evt.target.value);
  }*/

  /*renderAsterisk() {
    if (this.props.required){
      return (
        <span className={styles["required-ast"]}> *</span>
      );
    }
  }*/

  /*renderLabel() {
    return (
      <label className={styles.label}>
        {this.props.label}<Asterisk>
      </label>
    );
  }*/

  renderTextArea() {
    return (
      <textarea className={this.props.className}
                data-index={this.props.index}
                value={this.props.value}
                onChange={this.handleUserInput}
      />
    );
  }

  renderTextInput() {
    return (
      <input className={this.props.className}
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
      <div className={this.props.className}>
          <Label text={this.props.name} required={this.props.required} className={styles.label}/>
          {this.renderUserInput()}
          {this.renderErrors()}
      </div>
    );
  }
}


export default Input;
