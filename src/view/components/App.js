//----- imports ----------------------------------------------------------------

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home.js';
import Projects from './Projects.js';
import Blog from './Blog.js';
import BlogPost from './BlogPost.js';
import Logo from './Logo.js';
import Contact from './Contact.js';
import NavMenu from './NavMenu.js';
import NoMatch from './NoMatch.js';
import styles from '../stylesheets/App.module.css';


//----- export code block ------------------------------------------------------

export default function App() {
  return (
    <div className={styles.app}>
      <Router>
        <header>
          <div className={styles.innerHeader}>
            <Logo/>
            <NavMenu/>
          </div>
        </header>
        <div className={styles.routesContainer}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/projects" element={<Projects />} />
            <Route exact path="/blog" element={<Blog />} />
            <Route path="/blog/:postId" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route element={<NoMatch />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}
