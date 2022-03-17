//----- imports ----------------------------------------------------------------

import React from 'react';
import styles from '../stylesheets/Home.module.css';


//----- export code block ------------------------------------------------------

export default function Home(){

  return (
    <div className={styles.container}>
      <h1>
        About Me
      </h1>
      <p>
        I am a font-end developer based in the beautiful state of Maine. I'm passionate about coding and all things related to JavaScript. I previously worked as a spatial data analyst and have many years of experience programming in python. Web maps got me hooked on front-end development.
      </p>
      <h2>
        What's New?
      </h2>
      <p>
        Read about the latest <a href='./projects'>projects</a> that I've been working on, such as the <a href='./blog/pge-1'>People's Guide to Energy</a>.
        Also, check out my latest articles in the <a href='./blog'>blog</a> section of my website. I like to write about all things HTML, CSS, and JavaScript.
      </p>
    </div>
  );
};
