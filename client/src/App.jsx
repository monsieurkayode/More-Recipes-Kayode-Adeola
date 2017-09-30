import React, { Component } from 'react';
import IndexPage from './components/IndexPage';
// import RecipeViewPage from './components/RecipeViewPage';

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
