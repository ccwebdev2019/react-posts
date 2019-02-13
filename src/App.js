import React, { Component } from "react";
import "./App.css";

// redux
import { Provider } from "react-redux";
import store from "./store";

// react router dom
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation } from "./components/Navigation/Navigation";
import { Home } from "./components/Home/Home";
import Posts from "./components/Posts/Posts";
import SinglePost from "./components/SinglePost/SinglePost";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className='App'>
          <Router>
            <div>
              <Navigation />
              <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/posts/:postId' component={SinglePost} />
                <Route path='/posts' component={Posts} />
              </Switch>
            </div>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
