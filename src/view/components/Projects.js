//----- imports ----------------------------------------------------------------

import React, { useState, useEffect } from 'react';
import Md from './Md.js';
import { getPage } from '../../services/md.js';


//----- export code block ------------------------------------------------------

export default function Projects(){

  const [mdText, setMdText] = useState('');

  useEffect( () => {
    getPage('projects').then( text => {
      setMdText(text);
    });
  });

  return (
    <Md mdText={mdText}></Md>
  );

};
