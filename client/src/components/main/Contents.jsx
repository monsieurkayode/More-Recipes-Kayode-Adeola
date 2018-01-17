import React, { Component } from 'react';

import { Category, Recipes, TopRecipes } from './';

class Contents extends Component {
  render() {
    return (
      <div className="row">
        <Category />
        <Recipes />
        <TopRecipes />
      </div>
    );
  }
}

export default Contents;
