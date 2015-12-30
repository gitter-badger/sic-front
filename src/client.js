import './styles/app.scss';

import createHashHistory from 'history/lib/createHashHistory';
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import {RelayRouter} from 'react-router-relay';

import routes from './routes';

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://localhost:3000/graphql')
);

const history = createHashHistory({queryKey: false});

const mountNode = document.createElement('div');
document.body.appendChild(mountNode);

ReactDOM.render(
  <RelayRouter history={history} routes={routes} />,
  mountNode
);
