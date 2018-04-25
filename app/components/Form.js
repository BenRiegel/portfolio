import React, { Component } from 'react';
import FormActions from '../services/FormActions';
import InputField from './InputField';
import styles from '../stylesheets/Form.css';


class Form extends Component {

  constructor (props) {
    super(props);

    var hasRequiredFields = false;
    var fields = {};
    var inputRows = props.formComponents.inputRows;
    inputRows.forEach( (row) => {
      fields[row.name] = {
        value: "",
        valid: (row.required === false),
      }
      hasRequiredFields = hasRequiredFields || row.required;
    });

    this.state = {
      fields: fields,
      hasRequiredFields: hasRequiredFields,
      formValid: (hasRequiredFields === false),
      formSubmitted: false,
    }
  }

  updateField(fieldName, fieldValue, fieldValid){
    var newFields = {};
    for (let key in this.state.fields){
      newFields[key] = this.state.fields[key];
    }
    newFields[fieldName] = {
      value: fieldValue,
      valid: fieldValid
    }
    var formValid = true;
    for (let key in newFields){
      formValid = formValid && newFields[key].valid;
    }
    this.setState({
      fields: newFields,
      formValid: formValid,
    });
  }

  renderInputField(component, index){
    return (
      <div className={styles.row} key={index}>
        <InputField type={component.type}
                   name={component.name}
                   label={component.label}
                   required={component.required}
                   formSubmitted={this.state.formSubmitted}
                   onValueChange={ (name, fieldValue, fieldValid) =>
                     this.updateField(name, fieldValue, fieldValid)
                   }
        />
      </div>
    );
  }

  renderInputFields(){
    return this.props.formComponents.inputRows.map( (component, index) =>
      this.renderInputField(component, index));
  }

  renderRequiredFieldsText(){
    if (this.state.hasRequiredFields){
      return (
        <div className={styles["required-fields-text"]}>
          * Field Required
        </div>
      );
    }
  }

  renderSubmitButton(){
    return (
      <div className={styles.row}>
        <input className = {styles["submit-button"]}
               type='submit'
               value={this.props.formComponents.submitButton.text}
        />
      </div>
    );
  }

  onSubmit(e){
    if (this.state.formValid === false){
      e.preventDefault();
      this.setState({formSubmitted: true});
    } else {
      this.props.onSubmit(e, this.state.fields);
      FormActions.submit();
    }
  }

  render() {
    return (
      <div>
        <form id={this.props.id}
               action={this.props.action}
               method={this.props.method}
               onSubmit={(evt) => this.onSubmit(evt)}>
          {this.renderInputFields()}
          {this.renderRequiredFieldsText()}
          {this.renderSubmitButton()}
        </form>
      </div>
    );
  }
}

export default Form;
