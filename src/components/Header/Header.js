import React, { PropTypes } from 'react';
import {
  Navbar,
  Nav,
  NavItem,
} from 'react-bootstrap';

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
        <MemberDropdownMenu member={props.member} onSignOut={props.onSignOut}/>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

Header.propTypes = {
  member: PropTypes.object.isRequired,
  onSignOut: PropTypes.func.isRequired,
};

