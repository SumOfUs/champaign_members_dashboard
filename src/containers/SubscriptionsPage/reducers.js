import { fromJS } from 'immutable';

import {
  FETCH_SUBSCRIPTIONS_REQUEST,
  FETCH_SUBSCRIPTIONS_SUCCESS,
  FETCH_SUBSCRIPTIONS_FAILURE,
  DELETE_SUBSCRIPTION_SUCCESS,
} from './actions';

const initialState = fromJS({
  subscriptions:  [],
  loading: false,
});

export const subscriptionsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_SUBSCRIPTIONS_REQUEST:
      return state.merge({ loading: true });
    case FETCH_SUBSCRIPTIONS_SUCCESS:
      return initialState.merge({ subscriptions: action.payload });
    case FETCH_SUBSCRIPTIONS_FAILURE:
      return state.merge({ subscriptions: [] });
    case DELETE_SUBSCRIPTION_SUCCESS:
      let subscriptions = state
        .get('subscriptions')
        .filter( subscription => subscription.get('id') !== action.payload  );
      return state.merge({subscriptions});
    default:
      return state;
  }
};
