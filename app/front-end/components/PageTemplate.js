import React from 'react';
import styles from '../stylesheets/PageTemplate.scss';


const PageTemplate = ( {children} ) => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        {children}
      </div>
    </div>
  );
};

export default PageTemplate;
