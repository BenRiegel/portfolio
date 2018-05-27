import React from 'react';
import styles from '../stylesheets/PageTemplate.scss';


const PageTemplate = ( {children} ) => {
  return (
    <div className={styles.main}>
      {children}
    </div>
  );
};

export default PageTemplate;
