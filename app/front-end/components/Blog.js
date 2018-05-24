import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from './PageTemplate.js';
import TagsList from './TagsList.js';
import Wait from './Wait.js';
import BlogStore from '../services/stores/BlogStore.js';
import BlogActions from '../services/actions/BlogActions.js';
import styles from '../stylesheets/Blog.scss';


//configurable constants -------------------------------------------------------

const TAGS_LIST = [ {name:"All",        indent:false},
                    {name:"JavaScript", indent:true},
                    {name:"Web Maps",   indent:true}
                  ];


//------------------------------------------------------------------------------

class Blog extends Component {

  constructor(props){
    super(props);
    this.state = BlogStore.initState();
    this.getNewState = this.getNewState.bind(this);
  }

  componentDidMount() {
    BlogStore.addListener(this.getNewState);
    if (!this.state.postsLoaded){
      BlogActions.requestPosts();
    }
  }

  componentWillUnmount() {
    BlogStore.removeListener(this.getNewState);
  }

  getNewState(){
    var newState = BlogStore.getState();
    this.setState(newState);
  }

  static getDerivedStateFromProps(nextProps, prevState){
    var prevFilter = prevState.filter;
    var newFilter = nextProps.match.params.tagId || null;
    if (newFilter != prevFilter){
      BlogActions.updateFilter(newFilter);
    }
    return prevState;
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
          <Link className={styles["post-title"]} to={`/blog/posts/${post.id}`}>
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
          <Link className={styles["read-more-link"]} to={`/blog/posts/${post.id}`}>Read More »</Link>
        </div>
      );
    }
  }


  renderBlogInfo(){
    if (this.state.postsLoaded){
      return (
        <div>
          <section className={styles["tags-list-section"]}>
            <TagsList tagsList={TAGS_LIST} posts={this.state.posts}  />
          </section>
          <section className={styles["blog-links-section"]}>
            {this.state.posts.map( (post, index) =>
              this.renderBlogLink(index, post))
            }
          </section>
        </div>
      );
    }
  }

  renderWaitingAnimation(){
    if (!this.state.postsLoaded){
      return (
        <div className={styles['wait-container']}>
          <Wait />
        </div>
      );
    }
  }

  render() {
    return (
      <PageTemplate>
        {this.renderBlogInfo()}
        {this.renderWaitingAnimation()}
      </PageTemplate>
    );
  }
}


export default Blog;
