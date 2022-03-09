import React from 'react';
import NavLink from './NavLink.js';
import styles from '../stylesheets/NavMenu.module.css';



const NavMenu = function(){
  return (
    <div className={styles.nav}>
      <NavLink linkToPath='/' text='Home' sectionName='home'/>
      <NavLink linkToPath='/projects' text='Projects' sectionName='projects'/>
      <NavLink linkToPath='/blog' text='Blog' sectionName='blog'/>
      <NavLink linkToPath='/about' text='About Me' sectionName='about'/>
    </div>
  );
};

export default NavMenu;
