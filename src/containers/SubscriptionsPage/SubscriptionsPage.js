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
      <div id="subscriptions-page" className="container">
        <h1 className="highlight">
          Your Recurring Donations
        </h1>
        <p>
          If you have any recurring donations set up with SumOfUs,
          you can view and cancel them here.
        </p>
        <p>If you'd like to set up a new recurring donation to support our
          work, <a href="http://sumofus.org/campaigns/">you can do so here</a>.
          You can always be in touch
          at <a href="mailto:donations@sumofus.org">donations@sumofus.org</a> with
          any questions!
        </p>
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
