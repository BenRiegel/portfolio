import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import styles from '../stylesheets/NavMenu.scss';


class NavMenu extends Component {

  render() {
    const { location } = this.props;
    var currentSection = location.pathname.split("/")[1] || "projects";

    return (
      <nav className={styles.nav}>
        <div className={currentSection === "projects" ? styles.selected : ""}>
          <Link to="/">Portfolio</Link>
        </div>
        <div className={currentSection === "blog" ? styles.selected : ""}>
          <Link to="/blog/index">Blog</Link>
        </div>
        <div className={currentSection === "about" ? styles.selected : ""}>
          <Link to="/about">About</Link>
        </div>
        <div className={currentSection === "contact" ? styles.selected : ""}>
          <Link to="/contact">Contact</Link>
        </div>
      </nav>
    );
  }
}

export default withRouter(NavMenu);
