import React from 'react';
import styles from '../stylesheets/FieldRow.scss';


const FieldRow = ( {children} ) => {

  //returned jsx ---------------------------------------------------------------

  return (
    <div className = {styles.row}>
      {children}
    </div>
  );

};

export default FieldRow;
