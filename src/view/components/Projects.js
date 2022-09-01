//----- imports ----------------------------------------------------------------

import React from 'react';
import styles from '../stylesheets/Projects.module.css';


//----- export code block ------------------------------------------------------

export default function Projects(){

  return (
    <div>
      <h1>
        Projects
      </h1>

      <div className={styles.projectContainer}>
        <h2>
          Minesweeper
        </h2>
        <div className={styles.infoContainer}>
          <ul>
            <li>
              See it <a href='https://minesweeper-riegel.netlify.app/'>live</a>
            </li>
            <li>
              Read about this project on my <a href='../blog/minesweeper'>blog</a>
            </li>
            <li>
              View source code on <a href='https://github.com/BenRiegel/minesweeper'>GitHub</a>
            </li>
          </ul>
          <img src="./images/minesweeper.png" alt="Minesweeper game"></img>
        </div>
      </div>

      <div className={styles.projectContainer}>
        <h2>
          My Professional Website
        </h2>
        <div className={styles.infoContainer}>
          <ul>
            <li>
              See it live (you're already seeing it!)
            </li>
            <li>
              Read about this project on my <a href='../blog/portfolio'>blog</a>
            </li>
            <li>
              View source code on <a href='https://github.com/BenRiegel/portfolio'>GitHub</a>
            </li>
          </ul>
          <img src="./images/portfolio.png" alt="My Professional Website"></img>
        </div>
      </div>

      <div className={styles.projectContainer}>
        <h2>
          Animating Select Menu
        </h2>
        <div className={styles.infoContainer}>
          <ul>
            <li>
              See it live: <a href='https://select-menu-vanilla-js.netlify.app/'>Vanilla JS version</a> and <a href='https://select-menu-react-js.netlify.app/'>React version</a>
            </li>
            <li>
              Read about this project on my <a href='../blog/select-menu-part-1'>blog</a>
            </li>
            <li>
              View source code on GitHub: <a href='https://github.com/BenRiegel/select-menu-demo-vanilla-js'>Vanilla JS version</a> and <a href='https://github.com/BenRiegel/select-menu-demo-react'>React version</a>
            </li>
          </ul>
          <img src="./images/select_menu.png" alt="Animating Select Menu"></img>
        </div>
      </div>

      <div className={styles.projectContainer}>
        <h2>
          The People's Guide to Energy
        </h2>
        <div className={styles.infoContainer}>
          <ul>
            <li>
              See it <a href='https://pgeproject.netlify.app/'>live</a>
            </li>
            <li>
              Read about this project on my <a href='../blog/pge-1'>blog</a>
            </li>
            <li>
              View source code on <a href='https://github.com/BenRiegel/pge-v2'>GitHub</a>
            </li>
          </ul>
          <img src="./images/pge.png" alt="People's Guide to Energy"></img>
        </div>
      </div>

    </div>
  );

};
