import React from 'react';
import { IndexLink } from 'react-router';
import { Navbar, NavbarBrand, Nav, NavItem } from 'react-bootstrap/lib'

export default class NavBar extends React.Component {
  render() {
    return (
      <Navbar staticTop={true}>
        <NavbarBrand>
          <IndexLink to="/">Continuous Invoice</IndexLink>
        </NavbarBrand>
      </Navbar>
    )
  }

}
