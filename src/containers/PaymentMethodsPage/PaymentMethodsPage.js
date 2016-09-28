import React, { Component, PropTypes } from 'react';
import {
  Button,
  PageHeader,
  Table,
} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { selectCurrentMember, selectAuthToken } from 'store/selectors';
import {
  selectPaymentMethods,
  selectDeletingPaymentMethods,
} from './payment-methods.selectors';
import {
  fetchPaymentMethods,
  deletePaymentMethod,
} from './payment-methods.actions';

const titleTemplates = {
  paypal_account: pm => `Paypal (${pm.email})`,
  credit_card: pm => `${pm.card_type} card ending in ${pm.last_4}`,
  default: () => 'Unknown payment method',
};

function paymentMethodTitle(paymentMethod) {
  const template = titleTemplates[paymentMethod.instrument_type] || titleTemplates.default;

  return template(paymentMethod);
}

export class PaymentMethodsPage extends Component {
  static propTypes = {
    auth: PropTypes.string,
    member: PropTypes.object.isRequired,
    paymentMethods: PropTypes.object,
    fetchPaymentMethods: PropTypes.func.isRequired,
    deletePaymentMethod: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.fetchPaymentMethods(this.props.auth);
  }

  onRowClick = (item) => {
    this.props.deletePaymentMethod(item.get('id'), this.props.auth);
  }

  renderRowButton(item) {
    const id = item.get('id').toString();
    const deleting = this.props.deleting.get(id);

    return (
      <Button onClick={() => this.onRowClick(item)} disabled={deleting}>
        { deleting ? <FontAwesome name='circle-o-notch' spin /> : 'Delete' }
      </Button>
    );
  }

  renderPaymentMethodRow(item) {
    const deleting = this.props.deleting.get(item.get('id')) || false;
    console.log('deleting:', this.props.deleting.get(item.get('id')));
    console.log(item.toJS());
    console.log(this.props.deleting.toJS());
    return (
      <tr key={item.get('id')}>
        <td>{paymentMethodTitle(item.toJS())}</td>
        <td>
          { this.renderRowButton(item) }
        </td>
      </tr>
    );
  }

  renderPaymentMethods() {
    const paymentMethods = this.props.paymentMethods;

    // we want to display:
    // - Paypal (email@example.com)
    // - VISA card ending in `2345`
    return (
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>Payment Method</th>
            <th>...</th>
          </tr>
        </thead>
        <tbody>
          {paymentMethods.map(paymentMethod => this.renderPaymentMethodRow(paymentMethod))}
        </tbody>
      </Table>
    );
  }

  render() {
    return (
      <div id="payment-methods-page">
        <div className="container">
          <PageHeader>Your Payment Methods</PageHeader>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  member: selectCurrentMember(),
  paymentMethods: selectPaymentMethods(),
  deleting: selectDeletingPaymentMethods(),
  auth: selectAuthToken(),
});

function mapDispatchToProps() {
  return dispatch => ({
    fetchPaymentMethods: auth => dispatch(fetchPaymentMethods(auth)),
    deletePaymentMethod: (id, auth) => dispatch(deletePaymentMethod(id, auth)),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethodsPage);
