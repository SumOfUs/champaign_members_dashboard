import { fromJS } from 'immutable';

import {
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILURE,
} from './RegistrationPage.actions';

const initialState = fromJS({
  submitting: false,
  success: false,
  errors: null,
  member: null,
});

export const registrationReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case REGISTRATION_REQUEST:
      return initialState.merge({
        submitting: true,
      });
    case REGISTRATION_SUCCESS:
      return initialState.merge({
        success: true,
        member: action.payload,
      });
    case REGISTRATION_FAILURE:
      return state.merge({
        submitting: false,
        success: false,
        errors: action.payload,
      });
    default:
      return state;
  }
};
