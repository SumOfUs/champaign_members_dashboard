import { LOCATION_CHANGE } from 'react-router-redux';
import { fromJS } from 'immutable';
import { reducer as formReducer } from 'redux-form/immutable';

import { authReducer } from 'containers/LoginPage/reducers';
import { LOGIN_SUCCESS } from 'containers/LoginPage/actions';

import { LOGOUT_SUCCESS } from './actions';

const routeInitialState = fromJS({
  locationBeforeTransitions: null,
});

function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload,
      });
    default:
      return state;
  }
}

const initialGlobalState = fromJS({});
function globalReducer(state = initialGlobalState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return state.merge({
        member: action.payload.member,
      });
    case LOGOUT_SUCCESS:
      return fromJS({});
    default:
      return state;
  }
}

export default {
  form: formReducer,
  route: routeReducer,
  global: globalReducer,
  auth: authReducer,
};
