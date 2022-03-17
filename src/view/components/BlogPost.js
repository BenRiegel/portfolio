//----- imports ----------------------------------------------------------------

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import { coldarkCold } from "react-syntax-highlighter/dist/esm/styles/prism";
import { getPost } from '../../services/md.js';
import styles from '../stylesheets/BlogPost.module.css';


//----- export code block ------------------------------------------------------

export default function BlogPost(props){

  const [mdText, setMdText] = useState('');
  const { postId } = useParams();

  useEffect( () => {
    getPost(postId).then( text => {
      setMdText(text);
    });
  });

  return (
    <div className={styles.container}>
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
