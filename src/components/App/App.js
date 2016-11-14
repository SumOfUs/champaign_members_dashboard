import React, { Component } from 'react';
import Helmet from 'react-helmet';
import './App.css';

export class App extends Component {
  static propTypes = {
    children: React.PropTypes.node,
    locale:  React.PropTypes.string,
    messages: React.PropTypes.object,
  }

  render() {
    return (
      <div className="App-wrapper">
      <Helmet
      titleTemplate="%s - Champaign"
      defaultTitle="Member's Dashboard - Champaign"
      meta={[]}
      />
      {this.props.children}
      </div>
    );
  }
};
