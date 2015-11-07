import React from 'react';

import {
  Route
} from 'react-router';

import App from './components/App';
import { Dashboard } from './components/Dashboard';
import Login from './components/Login';

export default (
  <Route handler={App}>
    <Route name="dashboard" path="/" handler={Dashboard}/>
  </Route>
);
