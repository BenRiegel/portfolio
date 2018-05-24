import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from '../stylesheets/TagsList.scss';


class TagsList extends Component {

  constructor(props){
    super(props);
    this.state = {
      tagCountObj: {},
    };
  }

  static getDerivedStateFromProps(nextProps, prevState){
    var tagCountObj = {};
    var posts = nextProps.posts || [];
    posts.forEach( (post) => {
      post.tags.forEach( (tag) => {
        if (tag in tagCountObj){
          tagCountObj[tag] += 1;
        } else {
          tagCountObj[tag] = 1;
        }
      });
    });
    tagCountObj["All"] = posts.length;
    return {tagCountObj};
  }

  renderTag(index, tag){
    var count = (tag.name in this.state.tagCountObj) ? this.state.tagCountObj[tag.name] : 0;
    var pathTo = (tag.name == "All") ? "/blog" : `/blog/${tag.name}`;
    return (
      <Link className={styles.tag}
            to={pathTo}
            key={index}>
        {tag.name} ({count})
      </Link>
    );
  }

  render() {
    return (
      <div>
         <div className={styles.title}> Filter By Tag </div>
         { this.props.tagsList.map( (tag, index) =>
           this.renderTag(index, tag) )
         }
      </div>
    );
  }
}

export default TagsList;
