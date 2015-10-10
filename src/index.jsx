import './index.html';
import './styles/app.css';

import React from 'react';
import Router, { Route } from 'react-router';
import routes from './routes.jsx';

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});
