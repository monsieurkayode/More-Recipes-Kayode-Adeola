import React, { Component } from 'react';
import RecipeItem from './RecipeItem';

class Recipes extends Component {
  render() {
    return (
      <div className="col l5 m6 s12">
        <span>You are viewing page 1</span>
        <p className="divider"></p>
        <div className="row">
          <RecipeItem />
          <RecipeItem />
          <RecipeItem />
          <RecipeItem />
          <RecipeItem />
          <RecipeItem />
        </div>
      </div>
    );
  }
}

export default Recipes;