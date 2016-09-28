import { createSelector } from 'reselect';

export const selectPaymentMethodsState = () => state => state.get('paymentMethods');

export const selectPaymentMethods = () => createSelector(
  selectPaymentMethodsState(),
  state => state.get('paymentMethods')
);

export const selectDeletingPaymentMethods = () => createSelector(
  selectPaymentMethodsState(),
  state => state.get('paymentMethodsBeingDeleted')
);
