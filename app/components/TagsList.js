import React, { Component } from 'react';
import styles from '../stylesheets/Blog.scss';


class TagsList extends Component {

  constructor(props){
    super(props);
    this.tagsList = ["JavaScript", "Web Maps"];
  }

  renderTag(index, tag){
    var count = (tag in this.props.tags) ? this.props.tags[tag] : 0;
  //  var count = 0;
    return (
      <div key={index}>
        {tag} ({count})
      </div>
    );
  }

  render() {
    console.log(this.props);
    return (
      <div>
         Filter By Tag
        { this.tagsList.map( (tag, index) =>
          this.renderTag(index, tag)
        )}
      </div>
    );
  }
}

export default TagsList;
