import React from 'react';

export default class World extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  updateCount() {
    this.setState({count: this.state.count+10})
  }

  render() {
    return <h1 onClick={this.updateCount.bind(this)}>World {this.state.count}</h1>
  }

}
