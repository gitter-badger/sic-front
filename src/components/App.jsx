import React from 'react';

import NavBar from './NavBar';

class App extends React.Component {

  static propTypes = {
    children: React.PropTypes.node.isRequired
  }

  render() {
    return (
      <div className="content">
        <NavBar/>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
