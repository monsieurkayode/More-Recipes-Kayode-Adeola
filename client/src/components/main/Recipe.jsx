import React, { Component } from 'react';
import RecipeItem from './RecipeItem';

class Recipe extends Component {
  render() {
    return (
      <div class="col l5 m6 s12">
        <span>You are viewing page 1</span>
        <p class="divider"></p>
        <div class="row">
          <RecipeItem />
          <RecipeItem />
          <RecipeItem />
          <RecipeItem />
        </div>
      </div>
    );
  }
}

export default Recipe;