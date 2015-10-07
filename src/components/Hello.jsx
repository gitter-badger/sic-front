import React from 'react';

export default class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  updateCount() {
    this.setState({count: this.state.count+1})
  }

  render() {
    return <h1 onClick={this.updateCount.bind(this)}>Hellooo {this.state.count}</h1>
  }
}
