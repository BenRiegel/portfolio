import React, { Component } from 'react';
import BlogActions from '../services/actions/BlogActions.js';
import styles from '../stylesheets/TagList.scss';


class TagsList extends Component {

  constructor(props){
    super(props);
    //this.tagsList = ["JavaScript", "Web Maps"];
  }

  handleClick(evt){
    var tagName = evt.target.dataset.id;
    BlogActions.updateFilter(tagName);
  }

  renderTag(index, tag){
    var count = (tag in this.props.tags) ? this.props.tags[tag] : 0;
    return (
      <div className={styles.tag}
           key={index}
           data-id={tag}
           onClick={(evt)=>this.handleClick(evt)}>
        {tag} ({count})
      </div>
    );
  }

  render() {
    return (
      <div>
         Filter By Tag
         { this.props.tagsList.map( (tag, index) =>
           this.renderTag(index, tag) )
         }
      </div>
    );
  }
}

export default TagsList;
