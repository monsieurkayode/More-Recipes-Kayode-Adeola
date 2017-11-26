import React, { Component } from 'react';

import { RecipeCardSmall, RecipeCardLarge } from '../recipes/Index.jsx';
import { WelcomeDisplay } from './Index.jsx';

class UserRecipe extends Component {
  render() {
    return (
      <div id="user-recipes" className="col l9 m12 s12 offset-l3">
        <WelcomeDisplay />
        <div id="my-recipes" className="row">
          <RecipeCardLarge />
          <div className="row">
            <RecipeCardSmall />
            <RecipeCardSmall />
            <RecipeCardSmall />
            <RecipeCardSmall />
          </div>
        </div>
      </div>
    );
  }
}

export default UserRecipe;
