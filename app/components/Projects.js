import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Projects extends Component {
  render() {
    return (
      <div>
        <h2>Projects!</h2>
        <li><Link to='/blog/post2'>post2</Link></li>
      </div>
    );
  }
}

export default Projects;
