import React, { PropTypes } from 'react';
import {
  Navbar,
  NavItem,
  Nav,
} from 'react-bootstrap';
import { Link } from 'react-router';

import { MemberDropdownMenu } from './MemberDropdownMenu';

export const Header = (props) => (
  <Navbar inverse staticTop fluid>
    <Navbar.Header>
      <Navbar.Brand>
        <img role="presentation" src={require('assets/images/sum-of-us-logo.png')} />
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        <NavItem eventKey={1}>
          <Link to="/subscriptions">Subscriptions</Link>
        </NavItem>
        <NavItem eventKey={1}>
          <Link to="/payment-methods">Payment Methods</Link>
        </NavItem>
        <MemberDropdownMenu member={props.member} onSignOut={props.onSignOut} />
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

Header.propTypes = {
  member: PropTypes.object.isRequired,
  onSignOut: PropTypes.func.isRequired,
};
