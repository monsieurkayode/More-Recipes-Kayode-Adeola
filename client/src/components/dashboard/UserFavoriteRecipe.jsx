import React, { Component } from 'react';

import { WelcomeDisplay } from './Index.jsx';
import { RecipeCardSmall } from '../recipes/Index.jsx';

class UserFavoriteRecipe extends Component {
  render() {
    return (
      <div id="favorite-recipes" className="col l9 m12 s12 offset-l3">
        <WelcomeDisplay />
        <div id="user-favorites" className="row">
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

export default UserFavoriteRecipe;
