import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from '../stylesheets/Logo.css';

class Logo extends Component {
  render() {
    return (
      <div>
        <Link className={styles["logo-container"]} to="/">
          <div className={styles.logo}>
            <div className={styles["logo-layer"]}></div>
            <div className={styles["logo-layer"]}></div>
            <div className={styles["logo-layer"]}></div>
          </div>
          <div className={styles["title-container"]}>
            <div className={styles.name}>Ben Riegel</div>
            <div className={styles.title}>Front-End Developer & JavaScript Engineer</div>
          </div>
        </Link>
      </div>
    );
  }
}

export default Logo;
