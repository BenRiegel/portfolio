import React, { Component } from 'react';
import styles from '../stylesheets/Comment.css';


class Comment extends Component {
  render() {
    return (
      <div>
        <hr/>
        <div id={this.props.id} className={styles.comment}>
          <div>
            <span className={styles.username}>by {this.props.username}</span>
            <span className={styles.date}>{this.props.date}</span>
          </div>
          <div className={styles.content}>{this.props.content}</div>
        </div>
      </div>
    );
  }
}

export default Comment;
