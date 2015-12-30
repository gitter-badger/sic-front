import React from 'react';
import {IndexRoute, Route} from 'react-router';

import ViewerQueries from './queries/ViewerQueries';

import TodoApp from './components/TodoApp';
import TodoList from './components/TodoList';

export default (
  <Route
    path="/" component={TodoApp}
    queries={ViewerQueries}
  >
    <IndexRoute
      component={TodoList}
      queries={ViewerQueries}
      prepareParams={() => ({status: 'any'})}
    />
    <Route
      path=":status" component={TodoList}
      queries={ViewerQueries}
    />
  </Route>
);
