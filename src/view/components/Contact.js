//----- imports ----------------------------------------------------------------

import React from 'react';
import styles from '../stylesheets/Contact.module.css';


//----- export code block ------------------------------------------------------

export default function Contact(){

  return (
    <div className={styles.container}>
      <h1>
        Contact Me
      </h1>

      <p>If you would like to get in touch, I would love to hear from you. Connect with me via:</p>
      <div className={styles.infoContainer}>
        <ul>
          <li>
            <a href = "mailto: ben.riegel@gmail.com">
             <img className={styles.icon} src="./images/email.png" alt="Email"></img>
              Email
            </a>
          </li>
          <li>
            <a href='https://www.linkedin.com/in/ben-riegel-1a00a835/'>
              <img className={styles.icon} src="./images/linkedin.png" alt="LinkedIn"></img>
              LinkedIn
            </a>
          </li>
        </ul>
      </div>

      <p>If you would like to see more of coding work, check out my pages at the following sites:</p>
      <div className={styles.infoContainer}>
        <ul>
          <li>
            <a href='https://github.com/BenRiegel'>
               <img className={styles.icon} src="./images/git_hub.png" alt="GitHub"></img>
               GitHub
            </a>
          </li>
          <li>
            <a href='https://codepen.io/benriegel'>
              <img className={styles.icon} src="./images/code_pen.png" alt="CodePen"></img>
              CopePen
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
