//----- imports ----------------------------------------------------------------

import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../stylesheets/BlogEntry.module.css';


//----- export code block ------------------------------------------------------

export default function BlogEntry(props){

  const {date, name, title, description} = props.post;

  return (
    <div className={styles.entry}>
      <Link to={`/blog/${name}`} className={styles.title}>
        {title}
      </Link>
      <div className={styles.date}> {date} </div>
      <div className={styles.summary}>
        {description}
        {' '}
        <Link to={`/blog/${name}`}>
          {'Read More'}
        </Link>
      </div>
    </div>
  );
};
