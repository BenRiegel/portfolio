import React, { Component } from 'react';
import Comment from './Comment';
import Form from './Form';
import FormStore from '../services/FormStore';
import FormActions from '../services/FormActions';
import DatabaseStore from '../services/DatabaseStore';
import DatabaseActions from '../services/DatabaseActions';
import '../stylesheets/CommentSection.css';


class CommentSection extends Component {

  constructor(props){
    super(props);
    this.state = {
      comments: [],
    }
    this.refs = {};
    this.zoomToCommentId = null;
    this.submitValidHandlerRef = null;
    this.commentsListener = null;
    this.submitCommentResultListener = null;
    this.formComponents = {
      "fields": [
        {type:"text", name:"username", label:"Name", required:true},
        {type:"textarea", name:"comment", label:"Comment", required:true}
      ],
      "submitButton": {text:"Submit Comment"}
    };
  }

  handleUpdateCommentResult(result){
    if (result.error){
      console.log("there was an error");
    } else {
      this.zoomToCommentId = result.commentKey;

    //  DatabaseActions.requestComments(this.props.postId);
      FormActions.successfulSubmit();
      setTimeout(function(){

//        comment.scrollIntoView();
      }, 0);
    }
  }

  loadComments(commentsArray){
    this.setState({comments:commentsArray}, function(){
      if (this.zoomToCommentId){
        var comment = this.refs[this.zoomToCommentId];
        setTimeout(function(){
          comment.scrollIntoView();
        }, 500);
      }
    });
  }

  componentDidMount() {
    this.commentsListener = DatabaseStore.addCommentsListener((comments) => this.loadComments(comments));
    this.submitCommentResultListener = DatabaseStore.addSubmitCommentResultListener((result) => this.handleUpdateCommentResult(result));
    this.submitValidHandlerRef = FormStore.addListener("FORM_VALID_ON_SUBMISSION", (fieldData) => {
      DatabaseActions.addComment(fieldData.username.value, fieldData.comment.value, this.props.postId);
    });
    DatabaseActions.requestComments(this.props.postId);
  }

  componentWillUnmount() {
    this.commentsListener.remove();
    this.submitCommentResultListener.remove();
    this.submitValidHandlerRef.remove();
  }

  renderComment(index, comment){
    return (
      <Comment key={index}
               id={comment.key}
               refName={input => this.refs[comment.key] = input}
               date={comment.date}
               username={comment.username}
               content={comment.comment}/>
    );
  }

  render() {
    return (
      <div id="comment-section">
        <Form formComponents={this.formComponents}/>
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
