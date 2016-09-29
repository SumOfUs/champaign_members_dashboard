import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Header } from '../../components/Header/Header';

import {
  selectCurrentMember,
} from '../../store/selectors';

import { signOut } from '../../store/actions';

export function HomePage(props) {
  return (
    <section id="home-page">
      <Header member={props.member} onSignOut={props.onSignOut} />
      <div role="main" id="content">
        {props.children}
      </div>
    </section>
  );
}

HomePage.propTypes = {
  member: PropTypes.object.isRequired,
  onSignOut: PropTypes.func.isRequired,
  children: PropTypes.node,
};

const mapStateToProps = createStructuredSelector({
  member: selectCurrentMember(),
});

const mapDispatchToProps = dispatch => ({
  onSignOut: () => dispatch(signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
