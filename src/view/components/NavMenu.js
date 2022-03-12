//----- imports ----------------------------------------------------------------

import React from 'react';
import NavLink from './NavLink.js';
import styles from '../stylesheets/NavMenu.module.css';


//----- export code block ------------------------------------------------------

export default function NavMenu(){
  return (
    <ul className={styles.nav}>
      <NavLink linkToPath='/' text='Home' sectionName='home'/>
      <NavLink linkToPath='/projects' text='Projects' sectionName='projects'/>
      <NavLink linkToPath='/blog' text='Blog' sectionName='blog'/>
      <NavLink linkToPath='/contact' text='Contact' sectionName='contact'/>
    </ul>
  );
};
