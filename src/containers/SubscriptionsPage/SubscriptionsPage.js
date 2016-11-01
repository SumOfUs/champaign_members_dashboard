import React, { PropTypes, Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectCurrentMember, selectAuthToken, selectLocale } from '../../store/selectors';
import { selectAllSubscriptions } from './selectors';
import { fetchSubscriptions, deleteSubscription } from './actions';
import Markdown from 'react-markdown';
import {FormattedMessage} from 'react-intl';
import translations from '../../react-intl/locales/messages';

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
          <FormattedMessage id="subscriptions.title" />
        </h1>

        <Markdown source={translations[this.props.locale].pages.subscriptions.description} />

        <SubscriptionList {...this.props} />
      </div>
    );
  }
};

SubscriptionsPage.propTypes = {
  member: PropTypes.object.isRequired,
  fetchSubscriptions: PropTypes.func.isRequired,
  deleteSubscription: PropTypes.func.isRequired,
  subscriptions: PropTypes.object,
  locale: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  member: selectCurrentMember(),
  subscriptions: selectAllSubscriptions(),
  auth: selectAuthToken(),
  locale: selectLocale(),
});

const mapDispatchToProps = dispatch => ({
  fetchSubscriptions: (auth) => dispatch(fetchSubscriptions(auth)),
  deleteSubscription: (id, auth) => dispatch(deleteSubscription(id, auth)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionsPage);
