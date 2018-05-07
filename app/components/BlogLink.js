import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from '../stylesheets/BlogLink.scss';


class BlogLink extends Component {

  renderTag(index, tag){
    return (
      <div className={styles.tag}>
        <i className="fas fa-tag" key={index}></i><span> {tag}</span>
      </div>
    );
  }

  render() {
    return (
      <div className={styles["blog-link"]}>

        <Link className={styles.title} to={this.props.post.id}>
          {this.props.post.title}
        </Link>

        <div className={styles["info-div"]}>
          <span>{this.props.post.datePublished}</span>
          <span>By Ben Riegel</span>
          { this.props.post.tags.map( (tag, index) =>
            this.renderTag(index, tag)
          )}
        </div>

        <div className={styles["post-summary"]}>
          {this.props.post.summary}
        </div>

        <Link className={styles["read-more-link"]} to={this.props.post.id}>Read More »</Link>

      </div>
    );
  }
}


export default BlogLink;
