import React, { PropTypes } from 'react';
import moment from 'moment';

export const SubscriptionItem = ({ subscription }) => (
  <tr>
    <td>{subscription.get('id')}</td>
    <td>{subscription.get('billing_day_of_month')}</td>
    <td>{moment(subscription.get('created_at')).format('l')}</td>
    <td>{subscription.get('price')}</td>
    <td>{subscription.get('transactions').size}</td>
    <td>
      <a href="#">View</a>
    </td>
  </tr>
);

SubscriptionItem.propTypes = {
  subscription: PropTypes.object.isRequired,
};
