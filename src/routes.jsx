import React from 'react';

import {
  Route
} from 'react-router';

import App from './components/App.jsx';
import Hello from './components/Hello.jsx';
import World from './components/World.jsx';

export default (
  <Route handler={App}>
    <Route handler={Hello} name="hello" path="/hello"/>
    <Route handler={World} name="world" path="/world"/>
  </Route>
);
