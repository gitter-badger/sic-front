import React from 'react';
import {IndexRoute, Route} from 'react-router';

import ViewerQueries from './queries/ViewerQueries';

import App from './components/App';
import Dashboard from './components/Dashboard';
import TransferForm from './components/TransferForm';

export default (
  <Route
    path="/" component={App}>
    <IndexRoute
      component={Dashboard}
      queries={ViewerQueries}/>
    <Route
      path="transfer"
      component={TransferForm}
      queries={ViewerQueries} />
  </Route>
);
