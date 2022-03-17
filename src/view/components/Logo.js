//----- imports ----------------------------------------------------------------

import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../stylesheets/Logo.module.css';


//----- export code block ------------------------------------------------------

export default function Logo(){

  return (
    <div className={styles.container}>
      <Link to='/'>
        <div className={styles.pic}></div>
      </Link>
      <div className={styles.nameContainer}>
        <Link to='/' className={styles.name}>Ben Riegel</Link>
        <div className={styles.title}>Front-End Developer</div>
      </div>
    </div>
  );
};
