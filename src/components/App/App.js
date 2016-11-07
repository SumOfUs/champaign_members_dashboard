import React, { Component } from 'react';
import Helmet from 'react-helmet';
import I18n from '../I18n.js'
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { selectLocale, selectMessages } from '../../store/selectors';
import './App.css';

export class App extends Component {
  static propTypes = {
    children: React.PropTypes.node,
    locale:  React.PropTypes.string,
    messages: React.PropTypes.object,
  }

  render() {
    return (
      <I18n locale={this.props.locale} messages={this.props.messages} >
        <div className="App-wrapper">
          <Helmet
              titleTemplate="%s - Champaign"
              defaultTitle="Member's Dashboard - Champaign"
              meta={[]}
          />
          {this.props.children}
        </div>
      </I18n>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  locale: selectLocale(),
  messages: selectMessages(),
});


export default connect(mapStateToProps)(App);
