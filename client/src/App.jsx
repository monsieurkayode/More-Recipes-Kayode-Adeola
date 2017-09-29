import React, { Component } from 'react';
import IndexPage from './components/IndexPage';

class App extends Component {
  render() {
    return (
      <IndexPage>
        {this.props.children}
      </IndexPage>
    );
  }
}

export default App;
