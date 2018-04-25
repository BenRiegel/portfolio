import React, { Component } from 'react';
import BlogLink from './BlogLink.js';
import {firebase, convertObjToArray} from '../services/Firebase';
import styles from '../stylesheets/Blog.css';


class Blog extends Component {

  constructor(props){
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    var postsRef = firebase.database().ref("posts");
    postsRef.on('value', (snapshot) => {
      var postsObj = snapshot.val();
      var postsArray = convertObjToArray(postsObj);
      postsArray.reverse();
      this.setState({posts: postsArray});
    });
  }

  renderBlogLink(index, path, linkName, datePublished, summary){
    return (
      <BlogLink key={ index } path={ path } linkName={ linkName } datePublished= { datePublished } summary= { summary }/>
    );
  }

  render() {
    return (
      <div id={styles.blog}>
        <h2>Blog</h2>
        <div>
          { this.state.posts.map( (post, index) =>
            this.renderBlogLink(index, post.id, post.title, post.datePublished, post.summary)
          )}
        </div>
      </div>
    );
  }
}

export default Blog;
