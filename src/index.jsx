import './index.html';
import './styles/app.scss';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import createHistory from 'history/lib/createHashHistory';

import Relay from 'react-relay';
import { RelayRouter } from 'react-router-relay';

import App from './components/App';
import { Dashboard } from './components/Dashboard';
import { InvoiceForm } from './components/InvoiceForm';

/*
render((
  <Router history={createHistory({queryKey: false})}>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard} />
      <Route path="invoice" component={InvoiceForm} />
    </Route>
  </Router>
), document.getElementById('app'))
*/

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://localhost:3000/graphql')
);


class User extends React.Component {

  static propTypes = {
    user: React.PropTypes.object.isRequired
  };

  render() {
    console.debug('Render user with', this.props);
    const {firstName, lastName} = this.props.user;
    return (
      <li><strong>{lastName}</strong> {firstName}</li>
    );
  }

}

const UserContainer = Relay.createContainer(User, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        firstName,
        lastName
      }
    `
  }
})

class Users extends React.Component {

  static propTypes = {
    viewer: React.PropTypes.object.isRequired
  };

  render() {
    const users = this.props.viewer.users.edges;
    return (
      <ul>
        {users.map(({node}) =>
          <User key={node.id} user={node}/>
        )}
      </ul>
    );
  }

}

const UsersContainer = Relay.createContainer(Users, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        users(first: 10) {
          edges {
            node {
              id
              ${UserContainer.getFragment('user')}
            }
          }
        }
      }
    `
  }
});

const UsersQueries = {
  viewer: (Component) => Relay.QL`query { viewer { ${Component.getFragment('viewer')} } }`
};

render(
  <RelayRouter
    history={createHistory({queryKey: false})}>
    <Route path="/" component={UsersContainer} queries={UsersQueries}></Route>
  </RelayRouter>,
  document.getElementById('app')
)
