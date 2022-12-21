import React, { PropTypes } from 'react';
import {
  Navbar,
  NavItem,
  Nav,
} from 'react-bootstrap';
import { Link } from 'react-router';

import { MemberDropdownMenu } from './MemberDropdownMenu';
import LocaleDropdownMenu from '../../containers/Header/LocaleDropdownMenu';
import './Header.css';

import {FormattedMessage} from 'react-intl';

export const Header = (props) => (
  <Navbar staticTop fluid>
    <Navbar.Header>
      <Navbar.Brand>
        <img id="logo" role="presentation" src={'logo.png'} />
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        <NavItem eventKey={1}>
          <Link to="/subscriptions">
            <FormattedMessage id="menu.recurring_donations" />
          </Link>
        </NavItem>
        <NavItem eventKey={1}>
          <Link to="/payment-methods">
            <FormattedMessage id="menu.payment_methods" />
          </Link>
        </NavItem>
        <MemberDropdownMenu member={props.member} onSignOut={props.onSignOut} />
        <LocaleDropdownMenu />
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

Header.propTypes = {
  member: PropTypes.object.isRequired,
  onSignOut: PropTypes.func.isRequired,
};
