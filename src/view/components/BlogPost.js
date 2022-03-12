//----- imports ----------------------------------------------------------------

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Md from './Md.js';
import { getPost } from '../../services/md.js';


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
    <Md mdText={mdText}></Md>
  );
};
