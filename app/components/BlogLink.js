import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from '../stylesheets/BlogLink.css';


class BlogLink extends Component {
  render() {
    return (
      <div className={styles["blog-link"]}>
        <div className={styles["date-div"]}>
          {this.props.datePublished}
        </div>
        <div className={styles["info-div"]}>
          <Link to={this.props.path}>{this.props.linkName}</Link>
          <div className={styles["post-summary"]}> {this.props.summary} </div>
        </div>
      </div>
    );
  }
}

export default BlogLink;
