import React, { Component } from 'react';
import styles from '../stylesheets/Fade.scss';
import NewAnimation from '../services/Animation';


class Fade extends Component {

  async componentDidMount() {
    await NewAnimation(500, (totalProgress)=> {
      this.refs.container.style.opacity = `${totalProgress}`;
    });
  }

  async componentWillUnmount() {
    await NewAnimation(2000, (totalProgress)=> {
      this.refs.container.style.opacity = `${1 - totalProgress}`;
    });
  }

  render() {
    return (
      <div className={styles.container} ref="container">
        {this.props.children}
      </div>
    );
  }
}

export default Fade;
