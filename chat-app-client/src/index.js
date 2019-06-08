import React, { Component } from 'react';
import { render } from 'react-dom';
import 'whatwg-fetch';
import Promise from 'promise-polyfill';
import './style.css';
import 'antd/dist/antd.css';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";


// screen imports
import Login from "./screens/Login";
import Chat from "./screens/Chat";



class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Router>
        <Route path="/login" exact component={Login} />
        <Route path="/chat" exact component={Chat} />
        <Route path="/" exact component={Login} />
      </Router>
    );
  }
}

render(<App />, document.getElementById('root'));
