import { getSubscriptions } from 'services/subscriptions';

export const FETCH_SUBSCRIPTIONS_REQUEST = 'FETCH_SUBSCRIPTIONS_REQUEST';
export const FETCH_SUBSCRIPTIONS_SUCCESS = 'FETCH_SUBSCRIPTIONS_SUCCESS';
export const FETCH_SUBSCRIPTIONS_FAILURE = 'FETCH_SUBSCRIPTIONS_FAILURE';

export const fetchSubscriptions = (memberId) => dispatch => {
  dispatch({ type: FETCH_SUBSCRIPTIONS_REQUEST });
  return getSubscriptions(memberId)
    .then(response => {
      dispatch({
        type: FETCH_SUBSCRIPTIONS_SUCCESS,
        payload: response.data,
      });
    });
};