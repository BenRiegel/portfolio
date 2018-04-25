import React, { Component } from 'react';
import Comment from './Comment';
import Form from './Form';
import {firebase, convertObjToArray} from '../services/Firebase';
import '../stylesheets/CommentSection.css';


class CommentSection extends Component {

  constructor(props){
    super(props);
    this.state = {
      comments: [],
    }
  }

  componentDidMount() {
    var postId = this.props.postId;
    var commentsRef = firebase.database().ref().child("comments").orderByChild("postId").equalTo(postId);
    commentsRef.on('value', (snapshot) => {
      var commentsObj = snapshot.val();
      var commentsArray = convertObjToArray(commentsObj);
      this.setState({comments:commentsArray});
    });
  }

  renderComment(index, comment){
    return (
      <Comment key={index}
               id={comment.key}
               date={comment.date}
               username={comment.username}
               content={comment.comment}/>
    );
  }


  formSubmitHandler(e, fieldData){
    e.preventDefault();
    var newCommentKey = firebase.database().ref().child('comments').push().key;
    var timeStamp = new Date();
    var updates = {};
    updates[`${newCommentKey}`] = {
      username: fieldData.username.value,
      comment: fieldData.comment.value,
      date: timeStamp.toDateString() + " " + timeStamp.toLocaleTimeString(),
      postId: this.props.postId,
    }
    firebase.database().ref().child('comments').update(updates, (error) => {
      if (error) {
        console.log('Synchronization failed');
      } else {
        document.getElementById(newCommentKey).scrollIntoView();
      }
    });
  }


  render() {

    const formComponents = {
      "inputRows": [
        {type:"text", name:"username", label:"Name", required:true},
        {type:"textarea", name:"comment", label:"Comment", required:true}
      ],
      "submitButton": {text:"Submit Comment"}
    };

    return (
      <div id="comment-section">
        <Form formComponents={formComponents}
              onSubmit={(evt, fieldData) => this.formSubmitHandler(evt, fieldData)}
        />
        <div id="comments-div">
          <h4>{ this.state.comments.length } Comments</h4>
          { this.state.comments.map( (comment, index) =>
            this.renderComment(index, comment) )
          }
        </div>
      </div>
    );
  }
}

export default CommentSection;
