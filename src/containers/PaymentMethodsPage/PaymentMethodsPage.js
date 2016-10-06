import React, { Component, PropTypes } from 'react';
import {
  Button,
  PageHeader,
  Table,
} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { selectCurrentMember, selectAuthToken } from '../../store/selectors';
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
    const paymentMethods = this.props.paymentMethods

    let list

    if(paymentMethods.size > 0){
      list = paymentMethods.map(paymentMethod => this.renderPaymentMethodRow(paymentMethod))
    } else {
      list = <tr><td colSpan='2'><h4>You don't have any payment methods</h4></td></tr>
    }


    // we want to display:
    // - Paypal (email@example.com)
    // - VISA card ending in `2345`
    return (
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th colSpan='2'>Payment Method</th>
          </tr>
        </thead>
        <tbody>
        { list }
        </tbody>
      </Table>
    );
  }

  render() {

    return (
      <div id="payment-methods-page">
        <div className="container">
          <PageHeader>Your Payment Methods</PageHeader>
          { this.props.paymentMethods ? this.renderPaymentMethods() : null }
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
