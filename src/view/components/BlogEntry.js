//----- imports ----------------------------------------------------------------

import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../stylesheets/BlogEntry.module.css';


//----- export code block ------------------------------------------------------

export default function BlogEntry(props){

  return (
    <div className={styles.entry}>
      <Link to={`/blog/${props.post.name}`} className={styles.title}>
        <h2>{props.post.title}</h2>
      </Link>
      <p className={styles.date}>
        {props.post.date}
      </p>
      <p className={styles.summary}>
        {props.post.description}
        <Link to={`/blog/${props.post.name}`}>
          {'Read More'}
        </Link>
      </p>
    </div>
  );
};
