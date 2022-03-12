//----- imports ----------------------------------------------------------------

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../stylesheets/NavLink.module.css';


//----- export code block ------------------------------------------------------

export default function NavLink(props){

  const location = useLocation();
  const currentPath = location.pathname;
  const pathSection = currentPath.split('/')[1] || 'home';
  const isSelected = (props.sectionName === pathSection);
  const selectedClass = isSelected ? styles.selected : '';
  const classNamesStr = `${selectedClass} ${styles.navLink}`;

  return (
    <li className={classNamesStr}>
      <Link to={props.linkToPath}>
        {props.text}
      </Link>
    </li>
  );
  
};
