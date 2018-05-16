import React, { Component } from 'react';
import CommentSection from './CommentSection.js';
import Wait from './Wait';
import BlogPostStore from '../services/stores/BlogPostStore.js';
import BlogPostActions from '../services/actions/BlogPostActions.js';
import styles from '../stylesheets/BlogPost.css';


class BlogPost extends Component {

  constructor(props){
    super(props);
    this.state = BlogPostStore.initState();
    BlogPostActions.requestPostInfo(props.match.params.postId);
  }

  componentDidMount() {
    BlogPostStore.addListener(this, () => {
      var newState = BlogPostStore.getState();
      this.setState(newState);
    });
  }

  componentWillUnmount() {
    BlogPostStore.removeListener(this);
  }

  renderWaitingAnimation(){
    if (this.state.loadingStatus == "loading"){
      return (
        <Wait />
      );
    }
  }

  renderBlogPostInfo(){
    //do something about dangerouslySetInnerHTML?
    if (this.state.loadingStatus == "done"){
      return (
        <section className={styles.post}>
          <div className={styles.title}>{this.state.postInfo.title}</div>
          <article className={styles.content} dangerouslySetInnerHTML={{__html: this.state.postInfo.html}}></article>
        </section>
      );
    }
  }

  render() {
    return (
      <div className={styles["blog-post-container"]}>
        {this.renderBlogPostInfo()}
        {this.renderWaitingAnimation()}
      </div>
    );
  }
}

//<CommentSection postId = {this.props.match.params.postId}/>

export default BlogPost;






//    <div className={styles.info}>
//      <div className={styles.author}>{this.state.author}</div>
//      <div className={styles["date-published"]}>{this.state.datePublished}</div>
  //  </div>

/*  loadPost(post){
    var fn = `/blog_posts/${post.fileName}`;
    fetch(fn).then( (response) => {
      response.text().then( (data) => {
        var html = mdConvertor.makeHtml(data);
        console.log("blog post data received ");
        this.setState({
          postLoaded: true,
          author: post.author,
          datePublished: post.datePublished,
          title: post.title,
          content: html,
        });
      });
    });
  }*/

/*  componentDidMount() {
    var postId = this.props.match.params.postId;
    this.postInfoListener = BlogStore.addPostInfoListener((postInfo) => this.loadPost(postInfo));
    BlogActions.requestPostInfo(postId);
  }

  componentWillUnmount() {
    this.postInfoListener.remove();
  }*/
