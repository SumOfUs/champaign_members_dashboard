import React, { PropTypes } from 'react';
import {
  NavDropdown,
  MenuItem,
} from 'react-bootstrap';

import {FormattedMessage} from 'react-intl';

export const MemberDropdownMenu = ({ member, onSignOut }) => (
  <NavDropdown eventKey={3} title={member.get('email')} id="basic-nav-dropdown">
    <MenuItem eventKey={3.3} onClick={onSignOut}>
      <FormattedMessage id="menu.sign_out" />
    </MenuItem>
  </NavDropdown>
);

MemberDropdownMenu.propTypes = {
  member: PropTypes.object.isRequired,
  onSignOut: PropTypes.func.isRequired,
};
