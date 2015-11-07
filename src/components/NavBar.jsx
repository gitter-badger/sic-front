import React from 'react';
import { Link } from 'react-router';
import { Navbar, NavBrand, Nav, NavItem } from 'react-bootstrap/lib'

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  signIn() {
    console.debug('signIn');
    this.setState({
      isLoggedIn: true
    })
  }

  signOut() {
    console.debug('signOut');
    this.setState({
      isLoggedIn: false
    })
  }

  render() {
    console.debug('loggedIn ?', this.state.isLoggedIn);
    let loginButton =
      <a className="btn btn-info navbar-btn navbar-right" onClick={this.signIn.bind(this)}>
        Sign In
      </a>;
    if (this.state.isLoggedIn)
      loginButton = <a className="btn btn-info navbar-btn navbar-right" onClick={this.signOut.bind(this)}>
        Sign Out
      </a>;

    return (
      <Navbar staticTop={true}>
        <NavBrand>Continuous Invoice</NavBrand>
        {loginButton}
      </Navbar>
    )
  }

}
