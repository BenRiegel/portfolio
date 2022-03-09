import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../stylesheets/NavLink.module.css';



const NavLink = function(props){

  const location = useLocation();
  const currentPath = location.pathname;
  const pathSection = currentPath.split('/')[1] || 'home';
  const isSelected = (props.sectionName === pathSection);
  const selectedClass = isSelected ? styles.selected : '';
  const classNamesStr = `${selectedClass} ${styles.navLink}`;

  return (
    <Link to={props.linkToPath} className={classNamesStr}>
      {props.text}
    </Link>
  );
};

export default NavLink;
