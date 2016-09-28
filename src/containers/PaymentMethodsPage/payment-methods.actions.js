import axios from 'axios';

import { BASE_URL } from '../../services/helpers';

export const FETCH_PAYMENT_METHODS_REQUEST = 'FETCH_PAYMENT_METHODS_REQUEST';
export const FETCH_PAYMENT_METHODS_SUCCESS = 'FETCH_PAYMENT_METHODS_SUCCESS';
export const FETCH_PAYMENT_METHODS_FAILURE = 'FETCH_PAYMENT_METHODS_FAILURE';

export const DELETE_PAYMENT_METHOD_REQUEST = 'DELETE_PAYMENT_METHOD_REQUEST';
export const DELETE_PAYMENT_METHOD_SUCCESS = 'DELETE_PAYMENT_METHOD_SUCCESS';
export const DELETE_PAYMENT_METHOD_FAILURE = 'DELETE_PAYMENT_METHOD_FAILURE';

const url = `${BASE_URL}/braintree/payment_methods`;

export const fetchPaymentMethods = token => dispatch => {
  dispatch({ type: FETCH_PAYMENT_METHODS_REQUEST });
  return axios.get(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then(response => {
      console.log('Fetched payment methods, dispatching SUCCESS');
      dispatch({
        type: FETCH_PAYMENT_METHODS_SUCCESS,
        payload: response.data,
      });

      return response;
    }, failure => {
      dispatch({
        type: FETCH_PAYMENT_METHODS_FAILURE,
        payload: failure,
      });
      throw failure;
    });
};

export const deletePaymentMethod = (id, token) => dispatch => {
  dispatch({ type: DELETE_PAYMENT_METHOD_REQUEST, payload: id });

  return axios.delete(`${url}/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then(response => {
      dispatch({ type: DELETE_PAYMENT_METHOD_SUCCESS, payload: id });
      return response;
    })
    .catch(error => {
      dispatch({ type: DELETE_PAYMENT_METHOD_FAILURE, payload: id, error });
      throw error;
    });
};
