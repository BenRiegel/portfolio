import React from 'react';
import styles from '../stylesheets/Field.scss';


const Field = ( {labelText, required, errors, showErrors, children} ) => {

  //private functions ----------------------------------------------------------

  var renderLabel = function(text, required){
    return (
      <div className={styles.label}>
        <span> {text} </span>
        <span className={styles.asterisk}> {required ? " *" : ""} </span>
      </div>
    );
  }

  var renderError = function(error, index){
    return (
      <div className={styles.errors} key={index}>
        {error}
      </div>
    );
  }

  var renderErrors = function(errors){
    return errors.map( (error, index) => renderError(error, index) );
  }


  //returned jsx ---------------------------------------------------------------

  return (
    <div>
      { renderLabel(labelText, required) }
      { children }
      { showErrors ? renderErrors(errors) : null}
    </div>
  );

};


export default Field;
