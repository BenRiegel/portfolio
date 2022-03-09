import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../stylesheets/BlogEntry.module.css';


const BlogEntry = function(props){
  const {date, name, title} = props.post;
  return (
    <div className={styles.blogEntry}>
      <div className={styles.blogDate}>
        {date + ' - '}
      </div>
      <Link to={`/blog/${name}`} className={styles.blogLink}>
        {title}
      </Link>
    </div>
  );
};

export default BlogEntry;
