import React from 'react';
import styles from '../stylesheets/Wait.scss';

const Wait = () => {
  return (
    <div className={styles.stackContainer}>
      <div className={styles.layer}></div>
      <div className={styles.layer}></div>
      <div className={styles.layer}></div>
    </div>
  );
};

export default Wait;
