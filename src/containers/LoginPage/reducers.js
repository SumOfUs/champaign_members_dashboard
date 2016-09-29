import { fromJS } from 'immutable';
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  getPersistedState,
} from './actions';

import { LOGOUT_SUCCESS } from '../../store/actions';

export function authReducer(state = getPersistedState(), action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return state.merge({
        token: action.payload.token,
        member: action.payload.member,
      });
    case LOGIN_FAILURE:
      return fromJS({});
    case LOGOUT_SUCCESS:
      return fromJS({});
    default:
      return state;
  }
}
