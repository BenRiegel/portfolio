import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TagsList from './TagsList.js';
import Wait from './Wait';
import BlogStore from '../services/stores/BlogStore.js';
import BlogActions from '../services/actions/BlogActions.js';
import styles from '../stylesheets/Blog.scss';


//configurable constants -------------------------------------------------------

const TAGS_LIST = ["JavaScript",
                    "Web Maps"];


//------------------------------------------------------------------------------


class Blog extends Component {

  constructor(props){
    super(props);
    this.state = BlogStore.initState();
  }

  componentDidMount() {
    BlogStore.addListener(this, () => {
      var newState = BlogStore.getState();
      this.setState(newState);
    });
    BlogActions.requestPosts();
  }

  componentWillUnmount() {
    BlogStore.removeListener(this);
  }

  renderTag(index, tag){
    return (
      <div className={styles.tag} key={index}>
        <i className="fas fa-tag"></i><span> {tag}</span>
      </div>
    );
  }

  renderBlogLink(index, post){
    if (!this.state.filter || post.tags.includes(this.state.filter)){
      return (
        <div className={styles["blog-link"]} key={index}>
          <Link className={styles.title} to={post.id}>
            {post.title}
          </Link>
          <div className={styles["info-div"]}>
            <span>{post.datePublished}</span>
            <span>By Ben Riegel</span>
            { post.tags.map( (tag, index) =>
              this.renderTag(index, tag)
            )}
          </div>
          <div className={styles["post-summary"]}>
            {post.summary}
          </div>
          <Link className={styles["read-more-link"]} to={post.id}>Read More »</Link>
        </div>
      );
    }
  }

  renderBlogInfo(){
    if (this.state.loadingStatus == "done"){
      return (
        <div>
          <section className={styles["blog-section"]}>
            <TagsList tagsList={TAGS_LIST} tags={this.state.tags} />
          </section>
          <section className={styles["blog-section"]}>
            { this.state.posts.map( (post, index) =>
              this.renderBlogLink(index, post)
            )}
          </section>
        </div>
      );
    }
  }

  renderWaitingAnimation(){
    if (this.state.loadingStatus == "loading"){
      return (
        <Wait />
      );
    }
  }

  render() {
    return (
      <div className={styles.blog}>
        <h2>Blog</h2>
        <div className={styles["blog-body"]}>
          {this.renderBlogInfo()}
          {this.renderWaitingAnimation()}
        </div>
      </div>
    );
  }
}

export default Blog;
