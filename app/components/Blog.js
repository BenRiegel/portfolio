import React, { Component } from 'react';
import BlogLink from './BlogLink.js';
import TagsList from './TagsList.js';
import DatabaseStore from '../services/DatabaseStore.js';
import DatabaseActions from '../services/DatabaseActions.js';
import styles from '../stylesheets/Blog.scss';


class Blog extends Component {

  constructor(props){
    super(props);
    this.state = {
      posts: [],
      tags: {},
    };
    this.postsListener = null;
  }

  loadPosts(postsArray){

    var tagCountObj = {};
    postsArray.forEach( (post) => {
      var tags = post.tags;
      tags.forEach( (tag) => {
        if (tag in tagCountObj){
          tagCountObj[tag] += 1;
        } else {
          tagCountObj[tag] = 1;
        }
      });
    });

    this.setState({posts: postsArray, tags:tagCountObj});
  }

  componentDidMount() {
    this.postsListener = DatabaseStore.addPostsListener((posts) => this.loadPosts(posts));
    DatabaseActions.requestPosts();
  }

  componentWillUnmount() {
    this.postsListener.remove();
  }

  renderBlogLink(index, post){
    return (
      <BlogLink key={ index } post={ post } />
    );
  }

  render() {
    console.log(this.state.posts);
    return (
      <div className={styles.blog}>
        <h2>Blog</h2>
        <div className={styles["blog-body"]}>
          <section className={styles["blog-section"]}>
            <TagsList tags={this.state.tags}></TagsList>
          </section>
          <section className={styles["blog-section"]}>
            { this.state.posts.map( (post, index) =>
              this.renderBlogLink(index, post)
            )}
          </section>
        </div>
      </div>
    );
  }
}

export default Blog;
