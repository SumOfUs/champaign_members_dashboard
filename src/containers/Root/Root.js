import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { IndexRoute, Router, Route } from 'react-router';

import App from '../../components/App/App';
import RequireAuthentication from '../RequireAuthentication';
import HomePage from '../HomePage/HomePage';
import LoginPage from '../LoginPage/LoginPage';
import RegistrationPage from '../RegistrationPage/RegistrationPage';
import SubscriptionsPage from '../SubscriptionsPage/SubscriptionsPage';
import PaymentMethodsPage from '../PaymentMethodsPage/PaymentMethodsPage';
import {IntlProvider, addLocaleData} from 'react-intl';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { selectLocale, selectMessages } from '../../store/selectors';

import de from 'react-intl/locale-data/de';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';

addLocaleData([...en, ...de, ...fr]);

export class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object,
    render: PropTypes.func,
  };

  render() {
  return (
    <Provider store={this.props.store}>
      <IntlProvider locale={this.props.locale} messages={this.props.messages.toJS()}>

      <Router history={this.props.history} render={this.props.render}>
        <Route component={App}>
          <Route path="/login" name="login" component={LoginPage} />
          <Route path="/register" name="register" component={RegistrationPage} />
          <Route component={RequireAuthentication}>
            <Route path="/" name="home" component={HomePage}>
            <IndexRoute component={SubscriptionsPage} />
            <Route path="subscriptions" name="subscriptions" component={SubscriptionsPage} />
            <Route path="payment-methods" name="payments" component={PaymentMethodsPage} />
            </Route>
          </Route>
        </Route>
      </Router>
      </IntlProvider>

    </Provider>
  );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object,
  render: PropTypes.func,
};


const mapStateToProps = createStructuredSelector({
  locale: selectLocale(),
  messages: selectMessages(),
});


export default connect(mapStateToProps)(Root);
