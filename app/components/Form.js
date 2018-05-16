import React, { Component } from 'react';
import FormField from './FormField';
import FormActions from '../services/actions/FormActions';
import FormStore from '../services/stores/FormStore';
import NewAnimation from '../services/Animation';
import Wait from './Wait';
import styles from '../stylesheets/Form.scss';


class Form extends Component {

  constructor (props) {
    super(props);
    this.state = FormStore.initState(props.formComponents.fields);
  }

  componentDidMount() {
    FormStore.addListener(this, () => {
      var newState = FormStore.getState();
      this.setState(newState, ()=>{
        if (this.state.resetting){
          this.animateFadeDown();
        }
      });
    });
  }

  componentWillUnmount() {
    FormStore.removeListener(this);
  }

  async animateFadeDown(){
    await NewAnimation(1500, (totalProgress)=> {
      this.finishedContainer.style.opacity = `${1 - totalProgress}`;
    });
    FormActions.done();
  }

  renderFormField(component, index){
    return (
      <div className={styles.row} key={index}>
        <FormField type={component.type}
                   label={component.label}
                   required={component.required}
                   value={component.value}
                   errors={component.errors}
                   showErrors={this.state.showErrors}
                   index={index}
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
               ref="submitButton"
               value={this.props.formComponents.submitButton.text}
        />
      </div>
    );
  }

  renderWaitingAnimation(){
    if (this.state.submitStatus == "waiting"){
      return (
        <Wait />
      );
    }
  }

  renderSubmitSuccessPage(){
    if (this.state.submitStatus == "success"){
      return (
        <div className={styles["finished-container"]}
             ref={ (node) => this.finishedContainer = node}>
          {this.props.successComponent}
        </div>
      );
    }
  }

  renderSubmitFailurePage(){
    if (this.state.submitStatus == "failure"){
      return (
        <div className={styles["finished-container"]}
             ref={ (node) => this.finishedContainer = node}>
          {this.props.failureComponent}
        </div>
      );
    }
  }

  onSubmit(e){
    e.preventDefault();
    this.refs.submitButton.blur();
    if (this.state.formValid){
      FormActions.submitValidForm();
      var data = {};
      this.state.fields.forEach( (field) => {
        data[field.name] = field.value;
      });
      this.props.submitFunction(data);    //not sure about this one
    } else {
      FormActions.submitInvalidForm();
    }
  }

  render() {
    return (
      <div className={this.props.className + " " + styles["form-container"]} >
        <form ref="form" onSubmit={(evt) => this.onSubmit(evt)}>
          {this.renderFormFields()}
          {this.renderRequiredFieldsText()}
          {this.renderSubmitButton()}
        </form>
        {this.renderWaitingAnimation()}
        {this.renderSubmitSuccessPage()}
        {this.renderSubmitFailurePage()}
      </div>
    );
  }
}

export default Form;
