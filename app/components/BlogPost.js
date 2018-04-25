import React, { Component } from 'react';
import mdConvertor from '../services/Showdown.js';
import {firebase} from '../services/Firebase.js';
import CommentSection from './CommentSection.js';
import styles from '../stylesheets/BlogPost.css';


class BlogPost extends Component {

  constructor(props){
    super(props);
    this.state = {
      author:"",
      datePublished: "",
      title: "",
      content: "",
    }
  }

  componentDidMount() {
    var postId = this.props.match.params.postId;
    var postRef = firebase.database().ref().child(`posts/${postId}`);
    postRef.on('value', (snapshot) => {
      var post = snapshot.val();
      var fn = `/blog_posts/${post.fileName}`;
      fetch(fn).then( (response) => {
        response.text().then( (data) => {
          var html = mdConvertor.makeHtml(data);
          this.setState({
            author: post.author,
            datePublished: post.datePublished,
            title: post.title,
            content: html,
          });
        });
      });
    });
  }

  render() {

    //do something about dangerouslySetInnerHTML
    return (
      <div>
        <section className={styles.post}>
          <div className={styles.title}>{this.state.title}</div>
          <div className={styles.info}>
            <div className={styles.author}>{this.state.author}</div>
            <div className={styles["date-published"]}>{this.state.datePublished}</div>
          </div>
          <article className={styles.content} dangerouslySetInnerHTML={{__html: this.state.content}}></article>
        </section>
        <CommentSection postId = {this.props.match.params.postId} url={this.props.url}/>
      </div>
    );
  }
}

export default BlogPost;
