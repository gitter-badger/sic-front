import React from 'react';

import {
  Route,
  DefaultRoute,
  NotFoundRoute
} from 'react-router';

import App from './components/App';
import { Dashboard } from './components/Dashboard';
import { InvoiceForm } from './components/InvoiceForm';

export default (
  <Route handler={App}>
    <Route name="dashboard" path="/" handler={Dashboard}/>
    <Route name="invoice" path="/invoice" handler={InvoiceForm}/>
    <DefaultRoute handler={Dashboard}/>
    <NotFoundRoute handler={Dashboard}/>
  </Route>
);
