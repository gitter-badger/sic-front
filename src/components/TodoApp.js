import React from 'react';
import Relay from 'react-relay';

import AddUserMutation from '../mutations/AddUserMutation';

import TodoListFooter from './TodoListFooter';
import TodoTextInput from './TodoTextInput';

class TodoApp extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object.isRequired,
    children: React.PropTypes.node.isRequired
  };

  onNewUserSave = (e) => {
    e.preventDefault();
    const lastName = this.refs.lastName.value;
    const {viewer} = this.props;

    console.debug('adduser viewer', viewer);

    Relay.Store.update(
      new AddUserMutation({viewer, firstName: 'ml', lastName: 'vdd'})
    );
  };

  render() {
    const {children} = this.props;

    return (
      <div data-framework="relay">
        <section className="todoapp">
          <header>
            <form onSubmit={this.onNewUserSave}>
              <input type="text" placeholder="First name" ref="firstName"/>
            <input type="text" placeholder="Last name" ref="lastName"/>
          <button type="submit">Create user</button>
            </form>
          </header>

          {children}
        </section>


      </div>
    );
  }
}


export default Relay.createContainer(TodoApp, {
  fragments: {
    viewer: () => Relay.QL`fragment on Viewer {
      ${AddUserMutation.getFragment('viewer')}
    }`

  }
});
