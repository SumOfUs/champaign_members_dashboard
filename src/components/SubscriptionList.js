import React, { PropTypes } from 'react';
import {
  PageHeader,
  Table,
} from 'react-bootstrap';
import { SubscriptionItem } from './SubscriptionItem';


const subscriptionItems = items => (
  <Table striped bordered condensed hover>
    <thead>
      <tr>
        <th>ID</th>
        <th>Billing Day of Month</th>
        <th>Created</th>
        <th>Price</th>
        <th>No. of Transactions</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {items.map(i => <SubscriptionItem key={i.get('id')} subscription={i} />)}
    </tbody>
  </Table>
);

const emptyList = () => <div>No subscriptions</div>;

export const SubscriptionList = (props) => {
  let items;
  if (!props.subscriptions) {
    items = emptyList();
  } else {
    items = subscriptionItems(props.subscriptions.toArray());
  }

  return (
    <div className="container">
      <PageHeader>Your Subscriptions</PageHeader>
      <div className="subscription-list">
        {items}
      </div>
    </div>
  );
};

SubscriptionList.propTypes = {
  subscriptions: PropTypes.object,
};
