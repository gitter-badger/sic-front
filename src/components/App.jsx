import React from 'react';

import { Route, Link, RouteHandler } from 'react-router';

import NavBar from './NavBar';

export default class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="content">
        <NavBar/>
        <div className="container">
          <RouteHandler />
        </div>
      </div>
    );
  }
}
