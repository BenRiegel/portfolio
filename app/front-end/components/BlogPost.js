import React, { Component } from 'react';
//import CommentSection from './CommentSection.js';
import PageTemplate from './PageTemplate.js';
import Wait from './Wait.js';
import BlogPostStore from '../services/stores/BlogPostStore.js';
import BlogPostActions from '../services/actions/BlogPostActions.js';
import styles from '../stylesheets/BlogPost.scss';


class BlogPost extends Component {

  constructor(props){
    super(props);
    var postId = this.props.match.params.postId;
    this.state = BlogPostStore.initState(postId);
    this.getNewState = this.getNewState.bind(this);
  }

  componentDidMount() {
    BlogPostStore.addListener(this.getNewState);
    if (!this.state.postInfoLoaded){
      BlogPostActions.requestPostInfo(this.props.match.params.postId);
    }
  }

  getNewState(){
    var newState = BlogPostStore.getState();
    this.setState(newState);
  }

  componentWillUnmount() {
    BlogPostStore.removeListener(this.getNewState);
  }

  renderWaitingAnimation(){
    if (!this.state.postInfoLoaded){
      return (
        <div className={styles.waitContainer}>
          <Wait />
        </div>
      );
    }
  }

  renderBlogPostInfo(){
    //do something about dangerouslySetInnerHTML?
    if (this.state.postInfoLoaded){
      return (
        <section className={styles.post}>
          <div className={styles.postTitle}>{this.state.postInfo.title}</div>
          <article className={styles.content} dangerouslySetInnerHTML={{__html: this.state.postInfo.html}}></article>
        </section>
      );
    }
  }

  render() {
    return (
      <PageTemplate title="Blog">
        {this.renderBlogPostInfo()}
        {this.renderWaitingAnimation()}
      </PageTemplate>
    );
  }
}

//<CommentSection postId = {this.props.match.params.postId}/>

export default BlogPost;
