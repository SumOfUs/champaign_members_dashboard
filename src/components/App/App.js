import React, { Component } from 'react';
import Helmet from 'react-helmet';

import './App.css';

class App extends Component {
  static propTypes = {
    children: React.PropTypes.node,
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
}

export default App;
