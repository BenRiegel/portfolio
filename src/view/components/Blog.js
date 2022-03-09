import React from 'react';
import BlogEntry from './BlogEntry.js';
import styles from '../stylesheets/Blog.module.css';
import posts from '../../posts/posts.json';


var parsedPosts = {};
for (var post of posts){
  var year = post.year;
  if (year in parsedPosts){
    parsedPosts[year].push(post);
  } else {
    parsedPosts[year] = [post];
  }
}

var years = Object.keys(parsedPosts);
years.sort();
years.reverse();


const YearBlock = function(props){
  const {year, posts} = props;
  return (
    <div className={styles.yearContainer}>
      <div className={styles.year}>{year}</div>
      {
        posts.map( post =>
          <BlogEntry key={post.title} post={post}/>
        )
      }
    </div>
  );
}

const Blog = function(){
  return (
    <div>
      {
        years.map( year =>
          <YearBlock key={year} year={year} posts={parsedPosts[year]} />
        )
      }
    </div>
  );
};

export default Blog;
