import React, { Component } from 'react';
import UserInput from './UserInput';
import FormStore from '../services/FormStore';
import styles from '../stylesheets/FormField.css';


class FormField extends Component {

  constructor (props) {
    super(props);
    this.state = {
      validation: {
        valid: !props.required,
        errors: null
      }
    }
    this.validationHandlerRef = null;
  }

  componentDidMount() {
    var eventName = this.props.name + "UpdatedValidation";
    this.validationHandlerRef = FormStore.addListener(eventName, (validationInfo) => {
      this.setState({validation: validationInfo});
    });
  }

  componentWillUnmount() {
    this.validationHandlerRef.remove();
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

  renderErrors(){
    if (this.props.submitFailed && !this.state.validation.valid){
      //refactor this for multiple errors
      return (
        <div className={styles.errors}>Please enter a valid {this.props.name}</div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderLabel()}
        <UserInput type={this.props.type}
                   name={this.props.name}
                   required={this.props.required}/>
        {this.renderErrors()}
      </div>
    );
  }
}


export default FormField;
