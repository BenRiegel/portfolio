import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../stylesheets/Logo.scss';


const Logo = () => {
  return (
    <Link className={styles.container} to="/">
      <div className={styles.name}>Ben Riegel</div>
      <div className={styles.title}>Full-Stack Developer & JavaScript Engineer</div>
      <div className={styles.logo}>
        <div className={styles.logoLayer}></div>
        <div className={styles.logoLayer}></div>
        <div className={styles.logoLayer}></div>
      </div>
    </Link>
  );
};

export default Logo;
