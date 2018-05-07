import React, { Component } from 'react';
import mdConvertor from '../services/Showdown.js';
import DatabaseStore from '../services/DatabaseStore.js';
import DatabaseActions from '../services/DatabaseActions.js';
import CommentSection from './CommentSection.js';
import styles from '../stylesheets/BlogPost.css';


class BlogPost extends Component {

  constructor(props){
    super(props);
    this.state = {
      postLoaded: false,
      author: "",
      datePublished: "",
      title: "",
      content: "",
    }
    this.postInfoListener = null;
  }

  loadPost(post){
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
  }

  componentDidMount() {
    var postId = this.props.match.params.postId;
    this.postInfoListener = DatabaseStore.addPostInfoListener((postInfo) => this.loadPost(postInfo));
    DatabaseActions.requestPostInfo(postId);
  }

  componentWillUnmount() {
    this.postInfoListener.remove();
  }

  render() {
    console.log("blog post rendering");
    //do something about dangerouslySetInnerHTML
    if (this.state.postLoaded === false){
      return null;
    }
//    <div className={styles.info}>
//      <div className={styles.author}>{this.state.author}</div>
//      <div className={styles["date-published"]}>{this.state.datePublished}</div>
  //  </div>


    return (
      <div>
        <section className={styles.post}>
          <div className={styles.title}>{this.state.title}</div>
          <article className={styles.content} dangerouslySetInnerHTML={{__html: this.state.content}}></article>
        </section>
        <CommentSection postId = {this.props.match.params.postId}/>
      </div>
    );
  }
}

export default BlogPost;
