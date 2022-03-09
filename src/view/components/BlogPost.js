import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
//import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { coldarkCold } from "react-syntax-highlighter/dist/esm/styles/prism";
import styles from '../stylesheets/BlogPost.module.css';
import getMd from '../../services/md.js';


const BlogPost = function(props){

  const [mdText, setMdText] = useState('');
  const { postId } = useParams();

  getMd(postId).then( text => {
    setMdText(text);
  });

  return (
    <div className={styles.post}>
      <ReactMarkdown
        children={mdText}
        components={{
          code({node, inline, className, children, ...props}) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                style={coldarkCold}
                language={match[1]}
                wrapLongLines={true}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          }
        }}

      />
    </div>
  );
};

export default BlogPost;
