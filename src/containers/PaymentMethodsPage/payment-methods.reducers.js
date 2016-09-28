import { fromJS } from 'immutable';

import {
  FETCH_PAYMENT_METHODS_REQUEST,
  FETCH_PAYMENT_METHODS_SUCCESS,
  FETCH_PAYMENT_METHODS_FAILURE,
  DELETE_PAYMENT_METHOD_REQUEST,
  DELETE_PAYMENT_METHOD_SUCCESS,
  DELETE_PAYMENT_METHOD_FAILURE,
} from './payment-methods.actions';

const initialState = fromJS({
  paymentMethods: [],
  paymentMethodsBeingDeleted: {},
  errors: null,
  loading: false,
});

export const paymentMethodsReducer = (state = initialState, action = {}) => {
  const paymentMethodsBeingDeleted = state.get('paymentMethodsBeingDeleted');
  let newPaymentMethods;

  switch (action.type) {
    case FETCH_PAYMENT_METHODS_REQUEST:
      return state.merge({ loading: true });
    case FETCH_PAYMENT_METHODS_FAILURE:
      return state.merge({ paymentMethods: [], errors: action.payload });
    case FETCH_PAYMENT_METHODS_SUCCESS:
      return initialState.merge({ paymentMethods: action.payload });
    case DELETE_PAYMENT_METHOD_REQUEST:
      return state.merge({
        paymentMethodsBeingDeleted: paymentMethodsBeingDeleted.merge({
          [action.payload]: true,
        }),
      });
    case DELETE_PAYMENT_METHOD_SUCCESS:
      newPaymentMethods = state
        .get('paymentMethods')
        .filterNot(item => item.get('id') === action.payload);

      return state.merge({
        paymentMethods: newPaymentMethods,
        paymentMethodsBeingDeleted: paymentMethodsBeingDeleted.merge({
          [action.payload]: false,
        }),
      });
    case DELETE_PAYMENT_METHOD_FAILURE:
      return state.merge({
        paymentMethodsBeingDeleted: paymentMethodsBeingDeleted.merge({
          [action.payload]: false,
        }),
      });
    default:
      return state;
  }
};
