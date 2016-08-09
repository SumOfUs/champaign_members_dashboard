import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Header } from 'components/Header/Header';

import {
  selectCurrentMember,
} from '../../store/selectors';

import { signOut } from 'store/actions';

export function HomePage(props) {
  return (
    <section id="home-page">
      <Header member={props.member} onSignOut={props.onSignOut} />
      <p>Home Pages</p>
    </section>
  );
}

HomePage.propTypes = {
  member: PropTypes.object.isRequired,
  onSignOut: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  member: selectCurrentMember(),
});

const mapDispatchToProps = dispatch => ({
  onSignOut: () => dispatch(signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
