import React, { PropTypes } from 'react';
import {
  NavDropdown,
  MenuItem,
} from 'react-bootstrap';

export const MemberDropdownMenu = ({ member, onSignOut }) => (
  <NavDropdown eventKey={3} title={member.get('email')} id="basic-nav-dropdown">
    <MenuItem eventKey={3.1}>Account</MenuItem>
    <MenuItem divider />
    <MenuItem eventKey={3.3} onClick={onSignOut}>Sign out</MenuItem>
  </NavDropdown>
);

MemberDropdownMenu.propTypes = {
  member: PropTypes.object.isRequired,
  onSignOut: PropTypes.func.isRequired,
};
