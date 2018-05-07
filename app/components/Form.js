import React, { Component } from 'react';
import FormField from './FormField';
import FormActions from '../services/FormActions';
import FormStore from '../services/FormStore';
import styles from '../stylesheets/Form.scss';


class Form extends Component {

  constructor (props) {
    super(props);
    this.state = {
      submitFailed: false,
    }
    this.hasRequiredFields = FormStore.init(props.formComponents.fields);
    this.submitFailedHandlerRef = null;
  }

  componentDidMount() {
    this.submitFailedHandlerRef = FormStore.addListener("FORM_INVALID_ON_SUBMISSION", () => {
      this.setState({submitFailed: true});
    });
  }

  componentWillUnmount() {
    this.submitFailedHandlerRef.remove();
  }

  renderFormField(component, index){
    return (
      <div className={styles.row} key={index}>
        <FormField type={component.type}
                   name={component.name}
                   label={component.label}
                   required={component.required}
                   submitFailed={this.state.submitFailed}
        />
      </div>
    );
  }

  renderFormFields(){
    return this.props.formComponents.fields.map( (component, index) => {
      return this.renderFormField(component, index);
    });
  }

  renderRequiredFieldsText(){
    if (this.hasRequiredFields){
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
    e.preventDefault();
    FormActions.submit();
  }

  render() {
    return (
      <div>
        <form className={this.props.className}
               onSubmit={(evt) => this.onSubmit(evt)}>
          {this.renderFormFields()}
          {this.renderRequiredFieldsText()}
          {this.renderSubmitButton()}
        </form>
      </div>
    );
  }
}

export default Form;
