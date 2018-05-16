import React, { Component } from 'react';
import styles from '../stylesheets/Wait.css';

class Wait extends Component {
  render() {
    return (
      <div className={styles["wait-container"]}>
        <div className={styles["stack-container"]}>
          <div className={styles.layer}></div>
          <div className={styles.layer}></div>
          <div className={styles.layer}></div>
        </div>
      </div>
    );
  }
}

export default Wait;
