import Immutable, { fromJS } from 'immutable';

import {
  FETCH_SUBSCRIPTIONS_REQUEST,
  FETCH_SUBSCRIPTIONS_SUCCESS,
  FETCH_SUBSCRIPTIONS_FAILURE,
} from './actions';

const initialState = fromJS({
  subscriptions:  Immutable.List([]),
  loading: false,
});

export const subscriptionsReducer = (state = fromJS({}), action = {}) => {
  switch (action.type) {
    case FETCH_SUBSCRIPTIONS_REQUEST:
      return state.merge({ loading: true });
    case FETCH_SUBSCRIPTIONS_SUCCESS:
      return initialState.merge({ subscriptions: action.payload });
    case FETCH_SUBSCRIPTIONS_FAILURE:
      return state.merge({ subscriptions: [] });
    default:
      return state.merge({ subscriptions: [] });
  }
};
