import React, { Component } from 'react';
import styles from '../stylesheets/Wait.scss';

class Wait extends Component {
  /*render() {
    return (
      <div className={styles["wait-container"]}>
        <div className={styles["stack-container"]}>
          <div className={styles.layer}></div>
          <div className={styles.layer}></div>
          <div className={styles.layer}></div>
        </div>
      </div>
    );
  }*/
  render() {
    return (
      <div className={styles["stack-container"]}>
        <div className={styles.layer}></div>
        <div className={styles.layer}></div>
        <div className={styles.layer}></div>
      </div>
    );
  }
}

export default Wait;
