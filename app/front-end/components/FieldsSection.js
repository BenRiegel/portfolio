import React from 'react';
import FieldRow from './FieldRow.js';
import Wait from './Wait.js';
import styles from '../stylesheets/FieldsSection.scss';


const FieldsSection = ( {children, hasRequiredFields, waiting} ) => {

  //private functions ----------------------------------------------------------

  var renderHasRequiredFieldsText = function(){
    return (
      <FieldRow>
        <div className={styles.requiredFieldsText}>
          * Field Required
        </div>
      </FieldRow>
    );
  }

  var renderSpinner = function(){
    return (
      <div className={styles.spinnerContainer}>
        <Wait />
      </div>
    );
  }

  //returned component ---------------------------------------------------------

  return (
    <div>
      <div className={styles.fieldsContainer}>
        { children }
        { waiting ? renderSpinner() : null}
      </div>
      { hasRequiredFields ? renderHasRequiredFieldsText() : null}
    </div>
  );

};

export default FieldsSection;
