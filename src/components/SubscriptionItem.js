import React, { PropTypes } from 'react';
import moment from 'moment';
import FontAwesome from 'react-fontawesome';
import {injectIntl, FormattedMessage} from 'react-intl';

import {
  Button,
} from 'react-bootstrap';


export const SubscriptionItem = (props) => {
  const deleting = false;

  const message = props.intl.formatMessage({id: "subscriptions.cancel_confirm"});

  const onCancelClick = (id,event) => {
    let confirm = window.confirm(message);

    if(confirm) {
      props.deleteSubscription(id, props.auth);
    }
  };

  return (
    <tr>
      <td>{moment(props.created_at).format('LL')}</td>
      <td>{props.currency} {props.amount}</td>
      <td>{props.transactions.length}</td>
      <td>
        <Button onClick={onCancelClick.bind(this, props.id)}>
          { deleting ? <FontAwesome name='circle-o-notch' spin /> : <FormattedMessage id="subscriptions.cancel" /> }
        </Button>
      </td>
    </tr>
  );
};

const { string, array, number } = PropTypes;

SubscriptionItem.propTypes = {
  billing_day_of_month: number.isRequired,
  created_at: string.isRequired,
  currency: string.isRequired,
  transactions: array.isRequired,
};

export default injectIntl(SubscriptionItem);
