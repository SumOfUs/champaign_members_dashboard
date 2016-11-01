import { fromJS } from 'immutable';
import { reducer as formReducer } from 'redux-form/immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import { LOGOUT_SUCCESS, CHANGE_LOCALE } from './actions';
import { LOGIN_SUCCESS } from '../containers/LoginPage/actions';

import { authReducer } from '../containers/LoginPage/reducers';
import { subscriptionsReducer } from '../containers/SubscriptionsPage/reducers';
import { paymentMethodsReducer } from '../containers/PaymentMethodsPage/payment-methods.reducers';
import { registrationReducer } from '../containers/RegistrationPage/RegistrationPage.reducers';
import translations from '../react-intl/locales/messages.js'

const initialGlobalState = fromJS({
  appName: `Member's Dashboard`,
  appVersion: '0.1.0',
  locale: 'en',
  messages: translations.en.messages,
});

function globalReducer(state = initialGlobalState, action = {}) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return state.merge({
        member: action.payload.member,
      });
    case LOGOUT_SUCCESS:
      return state.merge({
        member: null
      });
    case CHANGE_LOCALE:
      return state.merge({
        locale: action.payload,
        messages: translations[action.payload].messages,
      });
    default:
      return state;
  }
}

function routeReducer(state = fromJS({ locationBeforeTransitions: null }), action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload,
      });
    default:
      return state;
  }
}

export default {
  global: globalReducer,
  form: formReducer,
  route: routeReducer,
  auth: authReducer,
  subscriptions: subscriptionsReducer,
  paymentMethods: paymentMethodsReducer,
  registration: registrationReducer,
};
