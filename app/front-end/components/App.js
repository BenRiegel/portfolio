import React, { Component } from 'react';
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


class App extends Component {
  render() {
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
  }
}

export default App;



/*componentDidMount() {
  this.animateLoading();
}*/

/*async animateLoading(){
  await NewAnimation(400, (totalProgress)=>{
    this.refs.animationContainer.style.height = `${totalProgress * 100}%`;
  });
  await NewAnimation(700, (totalProgress)=>{
    this.refs.animationContainer.style.width = `${totalProgress * 100}%`;
  });
  this.refs.animationContainer.style.border = "0";
  await NewAnimation(900, (totalProgress)=>{
    this.refs.routesContainer.style.opacity = `${totalProgress}`;
  });
}*/

//    <main className={styles.main}>
//  </main>

//  <div className={styles["animation-container"]} ref="animationContainer">
//    <div className={styles["routes-container"]} ref="routesContainer">
//</div>
//</div>


  /*render() {
    return (
      <Router>
        <div>
          <header className={styles.header}>
            <Logo />
            <NavMenuWithRouter currentSection={this.state.currentSection}/>
          </header>
          <main className={styles.main}>
            <div className={styles["animation-container"]} ref="animationContainer">
              <div className={styles["routes-container"]} ref="routesContainer">
                <Switch>
                  <Route exact path="/" component={Projects} />
                  <Route exact path="/blog/index" component={Blog} />
                  <Route path="/blog/index/:tagId" component={Blog} />
                  <Route path="/blog/:postId" component={BlogPost} />
                  <Route path="/about" component={About} />
                  <Route path="/contact" component={Contact} />
                </Switch>
              </div>
            </div>
          </main>
        </div>
      </Router>
    );
  }*/
