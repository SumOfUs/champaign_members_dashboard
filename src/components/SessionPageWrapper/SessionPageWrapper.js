import React, { Component, PropTypes } from 'react';
import './SessionPageWrapper.css';
// import logo from 'sou-assets/images/logo-positive.png';
import LocaleDropdownMenu from '../../containers/Header/LocaleDropdownMenu';

import {
  Navbar,
  Nav,
} from 'react-bootstrap';

class SessionPageWrapper extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return (
      <div className="SessionPageWrapper">
        <div className="SessionPageWrapper-header">
        <section>
          <Navbar staticTop fluid>
            <Navbar.Header>
              <Navbar.Brand>
                {/* <img role="presentation" src={logo} /> */}
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <LocaleDropdownMenu />
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          </section>
        </div>
        <div className="SessionPageWrapper-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default SessionPageWrapper;
