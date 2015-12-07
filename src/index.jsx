import './index.html';
import './styles/app.scss';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import createHistory from 'history/lib/createHashHistory'

import App from './components/App';
import { Dashboard } from './components/Dashboard';
import { InvoiceForm } from './components/InvoiceForm';

render((
  <Router history={createHistory({queryKey: false})}>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard} />
      <Route path="invoice" component={InvoiceForm} />
    </Route>
  </Router>
), document.getElementById('app'))
