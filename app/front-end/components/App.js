import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Logo from './Logo.js';
import NavMenu from './NavMenu.js';
import Projects from './Projects.js';
import Blog from './Blog.js';
import BlogPost from './BlogPost.js';
import About from './About.js';
import Contact from './Contact.js';
import NoMatch from './NoMatch.js';
import styles from '../stylesheets/App.scss';


const App = () => {
  return (
    <Router>
      <div className={styles.app}>
        <header className={styles.header}>
          <Logo />
        </header>
        <NavMenu />
        <div className={styles.routesContainer}>
          <Switch>
            <Route exact path="/" component={Projects} />
            <Route exact path="/blog" component={Blog} />
            <Route path="/blog/posts/:postId" component={BlogPost} />
            <Route path="/blog/:tagId" component={Blog} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
