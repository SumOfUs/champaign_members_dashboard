import React, { PropTypes, Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectCurrentMember, selectAuthToken } from '../../store/selectors';
import { selectAllSubscriptions } from './selectors';
import { fetchSubscriptions, deleteSubscription } from './actions';

import { SubscriptionList } from '../../components/SubscriptionList';

export class SubscriptionsPage extends Component {
  componentDidMount() {
    const { auth } = this.props;
    this.props.fetchSubscriptions(auth);
  }

  render() {
    return (
      <div id="subscriptions-page">
        <SubscriptionList {...this.props} />
      </div>
    );
  }
}

SubscriptionsPage.propTypes = {
  member: PropTypes.object.isRequired,
  fetchSubscriptions: PropTypes.func.isRequired,
  deleteSubscription: PropTypes.func.isRequired,
  subscriptions: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  member: selectCurrentMember(),
  subscriptions: selectAllSubscriptions(),
  auth: selectAuthToken()
});

const mapDispatchToProps = dispatch => ({
  fetchSubscriptions: (auth) => dispatch(fetchSubscriptions(auth)),
  deleteSubscription: (id, auth) => dispatch(deleteSubscription(id, auth)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionsPage);
