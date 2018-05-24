import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import styles from '../stylesheets/NavLink.scss';


class NavLink extends Component {

  calculateClassNames(){
    var currentSection = this.props.location.pathname.split("/")[1] || "projects";
    var selectedName = (this.props.sectionName === currentSection) ? styles.selected : "";
    var classNameStr = `${selectedName} ${styles["nav-link"]}`;
    return classNameStr;
  }

  render() {
    return (
      <Link to={this.props.linkToPath} className={this.calculateClassNames()}>
        {this.props.text}
      </Link>
    );
  }
}

export default withRouter(NavLink);
