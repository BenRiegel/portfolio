//----- imports ----------------------------------------------------------------

import React from 'react';
import BlogEntry from './BlogEntry.js';
import posts from '../../assets/posts/posts.json';


//----- export code block ------------------------------------------------------

export default function Blog(){

  return (
    <>
      <h1>Posts</h1>
      <div>
        {
          posts.map( post => (
            <BlogEntry key={post.title} post={post} />
          ) )
        }
      </div>
    </>
  );

};
