import React from 'react';

import NavBar from './NavBar';

class App extends React.Component {
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
