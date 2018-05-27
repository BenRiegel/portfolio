import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import styles from '../stylesheets/NavLink.scss';


const NavLink = (props) => {

  var calculateClassNames = function(){
    var currentSection = props.location.pathname.split("/")[1] || "projects";
    var selectedName = (props.sectionName === currentSection) ? styles.selected : "";
    var classNameStr = `${selectedName} ${styles.navLink}`;
    return classNameStr;
  }

  return (
    <Link to={props.linkToPath} className={calculateClassNames()}>
      {props.text}
    </Link>
  );
};

export default withRouter(NavLink);
