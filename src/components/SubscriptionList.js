import React, { PropTypes } from 'react';
import Immutable from 'immutable';

import {
  PageHeader,
  Table,
} from 'react-bootstrap';

import { SubscriptionItem } from './SubscriptionItem';

const NoSubscriptions = props => (
  <tr><td colSpan='6'><h4>You don't have any recurring donations</h4></td></tr>
);

export const SubscriptionList = props => {
  let subscriptions;

  if(props.subscriptions.size > 0) {
    subscriptions = props.subscriptions.map(subscription=> <SubscriptionItem key={subscription.get('id')} deleteSubscription={props.deleteSubscription} auth={props.auth} {...subscription.toJS()} />);
  } else {
    subscriptions = <NoSubscriptions />;
  }

  return(
    <div className="container">
      <PageHeader>Your Subscriptions</PageHeader>
      <div className="subscription-list">
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Billing Day of Month</th>
              <th>Created</th>
              <th>Price</th>
              <th>No. of Transactions</th>
              <th colSpan='1'></th>
            </tr>
          </thead>
          <tbody>
            { subscriptions }
          </tbody>
        </Table>
      </div>
    </div>
  );
};

SubscriptionList.propTypes = {
  subscriptions: PropTypes.instanceOf(Immutable.List)
};
