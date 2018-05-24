import React, { Component } from 'react';
import NavLink from './NavLink.js';
import styles from '../stylesheets/NavMenu.scss';


class NavMenu extends Component {
  render() {
    return (
      <div className={styles.nav}>
        <NavLink linkToPath='/' text="Portfolio" sectionName="projects"/>
        <NavLink linkToPath='/blog' text="Blog" sectionName="blog"/>
        <NavLink linkToPath='/about' text="About" sectionName="about"/>
        <NavLink linkToPath='/contact' text="Contact" sectionName="contact"/>
      </div>
    );
  }
}

export default NavMenu;
