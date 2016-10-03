import { getSubscriptions } from '../../services/subscriptions'
import { api } from '../../services/helpers'

export const FETCH_SUBSCRIPTIONS_REQUEST = 'FETCH_SUBSCRIPTIONS_REQUEST'
export const FETCH_SUBSCRIPTIONS_SUCCESS = 'FETCH_SUBSCRIPTIONS_SUCCESS'
export const FETCH_SUBSCRIPTIONS_FAILURE = 'FETCH_SUBSCRIPTIONS_FAILURE'

export const DELETE_SUBSCRIPTION_REQUEST = 'DELETE_SUBSCRIPTION_REQUEST'
export const DELETE_SUBSCRIPTION_SUCCESS = 'DELETE_SUBSCRIPTION_SUCCESS'
export const DELETE_SUBSCRIPTION_FAILURE = 'DELETE_SUBSCRIPTION_FAILURE'

export const deleteSubscription = (id, token) => dispatch => {
  dispatch({ type: DELETE_SUBSCRIPTION_REQUEST, payload: id })

  return api.delete(`braintree/subscriptions/${id}`, { authorization: `Bearer ${token}` })
    .then(response => {
      dispatch({ type: DELETE_SUBSCRIPTION_SUCCESS, payload: id })
      return response
    })
    .catch(error => {
      dispatch({ type: DELETE_SUBSCRIPTION_FAILURE, payload: id, error })
      throw error
    })
}

export const fetchSubscriptions = token => dispatch => {
  dispatch({ type: FETCH_SUBSCRIPTIONS_REQUEST })
  return api.get('braintree/subscriptions', { authorization: `Bearer ${token}` })
    .then((response) => {
      return response.json()
    })
    .then(response => {
      dispatch({
        type: FETCH_SUBSCRIPTIONS_SUCCESS,
        payload: response,
      })
      return response
    })
}
