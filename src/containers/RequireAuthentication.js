import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectAuthToken,
  selectCurrentMember,
  selectLocationState,
} from '../store/selectors';


export class RequireAuthentication extends Component {
  componentWillMount() {
    if (!this.checkAuthentication(this.props)) {
      this.props.redirect('/login');
    }
  }

  componentWillUpdate(props) {
    if (!this.checkAuthentication(props)) {
      this.props.redirect('/login');
    }
  }

  // checkAuthentication is the actual method
  // that checks for props.token
  checkAuthentication(props) {
    return props.token && props.member;
  }

  render() {
    // render children if authenticated
    if (!this.checkAuthentication(this.props)) {
      return (null);
    }

    return (<div>{this.props.children}</div>);
  }
}

RequireAuthentication.propTypes = {
  token: PropTypes.string,
  member: PropTypes.object,
  locationState: PropTypes.object.isRequired,
  redirect: PropTypes.func.isRequired,
  children: PropTypes.node,
};

const mapStateToProps = () => createStructuredSelector({
  token: selectAuthToken(),
  member: selectCurrentMember(),
  locationState: selectLocationState(),
});

const mapDispatchToProps = dispatch => ({
  redirect: url => dispatch(push(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequireAuthentication);
