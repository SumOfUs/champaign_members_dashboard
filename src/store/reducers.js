import { LOCATION_CHANGE } from 'react-router-redux';
import { fromJS } from 'immutable';
import { reducer as formReducer } from 'redux-form/immutable';

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
function globalReducer(state = initialGlobalState) {
  return state;
}

export default {
  form: formReducer,
  route: routeReducer,
  global: globalReducer,
};
