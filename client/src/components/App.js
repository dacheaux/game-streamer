import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./navigation/Header";
import LeftBar from "./navigation/LeftBar";
import Landing from "./Landing";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Header />
          <div className="container-fluid text-left">
            <div className="row content">
              <LeftBar />
              <Route path="/" component={Landing} />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default connect(null, actions)(App);
