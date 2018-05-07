import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Logo from './Logo.js';
import NavMenuWithRouter from './NavMenu.js';
import Projects from './Projects.js';
import Blog from './Blog.js';
import BlogPost from './BlogPost.js';
import About from './About.js';
import Contact from './Contact.js';
import styles from '../stylesheets/App.scss';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <header className={styles.header}>
            <Logo />
            <NavMenuWithRouter />
          </header>
          <main className={styles.main}>
            <Switch>
              <Route exact path="/" component={Projects} />
              <Route path="/blog/index" component={Blog} />
              <Route path="/blog/:postId" component={BlogPost} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
