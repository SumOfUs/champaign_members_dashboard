import React, { PropTypes } from 'react';
import Immutable from 'immutable';

import {
  Table,
} from 'react-bootstrap';

import { SubscriptionItem } from './SubscriptionItem';

const NoSubscriptions = props => (
  <tr>
    <td colSpan='6'>
      <em>You don't have any recurring donations</em>
    </td>
  </tr>
);

export const SubscriptionList = props => {
  let subscriptions;

  if(props.subscriptions.size > 0) {
    subscriptions = props.subscriptions.map(subscription=>
      <SubscriptionItem
        key={subscription.get('id')}
        deleteSubscription={props.deleteSubscription}
        auth={props.auth}
        {...subscription.toJS()}
      />
    );
  } else {
    subscriptions = <NoSubscriptions />;
  }

  return(
    <Table className="list-table">
      <thead>
        <tr>
          <th>Created</th>
          <th>Donation Amount</th>
          <th>No. of Transactions</th>
          <th colSpan='1'></th>
        </tr>
      </thead>
      <tbody>
        { subscriptions }
      </tbody>
    </Table>
  );
};

SubscriptionList.propTypes = {
  subscriptions: PropTypes.instanceOf(Immutable.List)
};
