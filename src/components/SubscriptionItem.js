import React, { PropTypes } from 'react'
import moment from 'moment'
import FontAwesome from 'react-fontawesome'
import {
  Button,
} from 'react-bootstrap'


export const SubscriptionItem = (props) => {
  const deleting = false

  const onCancelClick = (id,event) => {
    let confirm = window.confirm("Are you sure you want to cancel your recurring donation?")
    if(confirm) {
      props.deleteSubscription(id, props.auth)
    }
  }

  const onViewClick = (event) => {
    // toggle table to reveal transaction rows
  }

  return (
    <tr>
      <td>{props.billing_day_of_month}</td>
      <td>{moment(props.created_at).format('l')}</td>
      <td>{props.currency} {props.amount}</td>
      <td>{props.transactions.length}</td>
      <td>
        <Button onClick={onCancelClick.bind(this, props.id)}>
          { deleting ? <FontAwesome name='circle-o-notch' spin /> : 'Cancel' }
        </Button>
      </td>
    </tr>
  )
}

const { string, array, number } = PropTypes

SubscriptionItem.propTypes = {
  billing_day_of_month: number.isRequired,
  created_at: string.isRequired,
  currency: string.isRequired,
  transactions: array.isRequired,
}
