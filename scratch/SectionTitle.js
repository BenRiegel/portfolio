import React, { Component } from 'react';
import styles from '../stylesheets/SectionTitle.scss';

class SectionTitle extends Component {

  render() {
    return (
      <div className={styles.title}>{this.props.title}</div>
    );
  }
}

export default SectionTitle;


/*<div className={styles.container}>

</div>
*/
