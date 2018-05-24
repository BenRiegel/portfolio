import React, { Component } from 'react';
import Input from './Input.js';
import FieldsSection from './FieldsSection.js';
import FieldRow from './FieldRow.js';
import Field from './Field.js';
import * as Utils from '../services/FormUtils.js';
import styles from '../stylesheets/Form.scss';


class Form extends Component {

  constructor(props) {
    super(props);
    this.state = this.initState();
    this.onSubmit = this.onSubmit.bind(this);
    this.updateFieldValue = this.updateFieldValue.bind(this);
  }

  initState(){
    var inputChildren = Utils.getChildrenByComponentName(this.props.children, "Input");
    var fields = Utils.calculateFieldData(inputChildren);
    var hasRequiredFields = Utils.calculateHasRequiredFields(fields);
    var formValid = Utils.calculateFormValidity(fields);
    return {fields, hasRequiredFields, formValid, showErrors:false};
  }

  updateFieldValue(label, newValue){
    var fields = Object.assign({}, this.state.fields);
    var field=fields[label];
    field.value = newValue;
    field.errors = Utils.updateFieldValidity(field.required, field.type, field.value, field.label);
    field.valid = (field.errors.length === 0);
    var formValid = Utils.calculateFormValidity(fields);
    this.setState({fields, formValid});
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    if (!prevProps.reset && this.props.reset){
      console.log("reset flipped");
    }
  }

  renderField(field, index){
    return (
      <FieldRow key={index}>
        <Field labelText={field.label}
               required={field.required}
               errors={field.errors}
               showErrors={this.state.showErrors}>
          <Input type={field.type}
                 className={field.className}
                 value={field.value}
                 label={field.label}
                 onChange={this.updateFieldValue} />
        </Field>
      </FieldRow>
    );
  }

  renderFields(){
    var entries = Object.entries(this.state.fields);
    return entries.map( (entry, index) => this.renderField(entry[1], index) );
  }

  renderFieldsSection(){
    return (
      <FieldsSection hasRequiredFields={this.hasRequiredFields} waiting={this.props.waiting}>
        {this.renderFields()}
      </FieldsSection>
    );
  }

  renderSubmitButton(){
    return Utils.getChildrenByComponentName(this.props.children, "SubmitButton");
  }

  renderSpinnerBackdrop(){
    return(
      <div className={styles.spinnerBackdrop}></div>
    );
  }

  onSubmit(e){
    e.preventDefault();

    if (this.state.formValid){
      this.props.submitFunction();
    //  FormActions.submitValidForm();
    //  var data = {};
    //  this.state.fields.forEach( (field) => {
    //    data[field.name] = field.value;
    //  });
  //    this.props.submitFunction(data);    //not sure about this one
    } else {
      this.setState({showErrors:true});
    }
  }

  render() {
    return (
      <div className={styles.formContainer}>
        <form onSubmit={this.onSubmit} className={this.props.className}>
          { this.renderFieldsSection() }
          { this.renderSubmitButton() }
          { this.props.waiting ? this.renderSpinnerBackdrop() : null}
        </form>
      </div>
    );
  }
}



export default Form;





//import FormField from './FormField';
//import Input from './Input';

//import FormActions from '../../services/actions/FormActions';
//import FormStore from '../../services/stores/FormStore';
//import NewAnimation from '../../services/Animation';
//import Wait from '../Wait';
//import styles from '../../stylesheets/Form.scss';


//error trap this in case only one child


//<div className={styles["fields-container"]}>////
//  {this.renderFormFields()}
//</div>

//      {this.renderRequiredFieldsText()}
//  {this.renderWaitingAnimation()}

/*renderWaitingAnimation(){
  if (this.state.submitStatus == "waiting"){
    return (
      <div className={styles['wait-container']}>
        <Wait />
      </div>
    );
  }
}*/

//{this.renderSubmitSuccessPage()}
//{this.renderSubmitFailurePage()}

/*renderSubmitSuccessPage(){
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
}*/


  /*getNewState(){
    var newState = FormStore.getState();
    this.setState(newState, ()=>{
      if (this.state.resetting){
        this.animateFadeDown();
      }
    });
  }

  componentDidMount() {
    FormStore.addListener(this.getNewState);
  }

  componentWillUnmount() {
    FormStore.removeListener(this.getNewState);
  }

  async animateFadeDown(){
    await NewAnimation(500, (totalProgress)=> {
      this.finishedContainer.style.opacity = `${1 - totalProgress}`;
    });
    FormActions.done();
  }*/

  /*renderFormField(component, index){
    return (
      <FormField key={index}
                 type={component.type}
                 label={component.label}
                 required={component.required}
                 value={component.value}
                 errors={component.errors}
                 showErrors={this.state.showErrors}
                 index={index}
                 className={styles.row}
      />
    );
  }*/



    /*  this.inputChildren.forEach( (child) => {
        var { name, type, required } = child.props;
        fields[name] = {type, required};
        hasRequiredFields = hasRequiredFields || required;
      });
      return {
        fields,
        hasRequiredFields,
        formValid: false,
        showErrors: false,
      }*/
