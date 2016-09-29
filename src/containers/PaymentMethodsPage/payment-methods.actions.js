import { api } from '../../services/helpers';

export const FETCH_PAYMENT_METHODS_REQUEST = 'FETCH_PAYMENT_METHODS_REQUEST';
export const FETCH_PAYMENT_METHODS_SUCCESS = 'FETCH_PAYMENT_METHODS_SUCCESS';
export const FETCH_PAYMENT_METHODS_FAILURE = 'FETCH_PAYMENT_METHODS_FAILURE';

export const DELETE_PAYMENT_METHOD_REQUEST = 'DELETE_PAYMENT_METHOD_REQUEST';
export const DELETE_PAYMENT_METHOD_SUCCESS = 'DELETE_PAYMENT_METHOD_SUCCESS';
export const DELETE_PAYMENT_METHOD_FAILURE = 'DELETE_PAYMENT_METHOD_FAILURE';

export const fetchPaymentMethods = token => dispatch => {
  dispatch({ type: FETCH_PAYMENT_METHODS_REQUEST });
  return api.get(`braintree/payment_methods`, { authorization: `Bearer ${token}` })
    .then(s => s.json())
    .then(response => {
      dispatch({
        type: FETCH_PAYMENT_METHODS_SUCCESS,
        payload: response,
      });
      return response;
    })
    .catch(failure => {
      dispatch({
        type: FETCH_PAYMENT_METHODS_FAILURE,
        payload: failure,
      });
      throw failure;
    });
};

export const deletePaymentMethod = (id, token) => dispatch => {
  dispatch({ type: DELETE_PAYMENT_METHOD_REQUEST, payload: id });

  return api.delete(`braintree/payment_methods/${id}`, { authorization: `Bearer ${token}` })
    .then(s => s.json())
    .then(response => {
      dispatch({ type: DELETE_PAYMENT_METHOD_SUCCESS, payload: id });
      return response;
    })
    .catch(error => {
      dispatch({ type: DELETE_PAYMENT_METHOD_FAILURE, payload: id, error });
      throw error;
    });
};
