import React from 'react';

import { Route, Link, RouteHandler } from 'react-router';

export default class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><Link to="hello">Hello</Link></li>
          <li><Link to="world">World</Link></li>
        </ul>
        <div>
          <RouteHandler />
        </div>
      </div>
    );
  }
}
