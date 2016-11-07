import React, { Component } from 'react';
import {IntlProvider, addLocaleData} from 'react-intl';

import de from 'react-intl/locale-data/de';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';

addLocaleData([...en, ...de, ...fr]);

export default class I18n extends Component {
  static propTypes = {
    children: React.PropTypes.node,
    messages: React.PropTypes.object,
    locale:  React.PropTypes.string,
  }

  render() {
    return(
      <IntlProvider locale={this.props.locale} messages={this.props.messages.toJS()}>
        {this.props.children}
      </IntlProvider>
    )
  }
};

