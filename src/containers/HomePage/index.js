import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectCurrentMember,
  selectSubscriptions,
  selectLoading,
  selectError,
} from '../../store/selectors';

export function HomePage() {
  return (
    <section id="home-page">
      <p>Home Pages</p>
    </section>
  );
}

const mapStateToProps = createStructuredSelector({
  member: selectCurrentMember(),
  subscriptions: selectSubscriptions(),
  loading: selectLoading(),
  error: selectError(),
});

export default connect(mapStateToProps)(HomePage);
