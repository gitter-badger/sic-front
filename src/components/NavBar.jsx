import React from 'react';
import { IndexLink } from 'react-router';
import { Navbar, NavbarBrand, Nav, NavItem } from 'react-bootstrap/lib'

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
        <NavbarBrand>
          <IndexLink to="/">Continuous Invoice</IndexLink>
        </NavbarBrand>
        {loginButton}
      </Navbar>
    )
  }

}
