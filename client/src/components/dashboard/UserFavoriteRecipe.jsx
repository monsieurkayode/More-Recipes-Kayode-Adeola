import React, { Component } from 'react';

class UserFavoriteRecipe extends Component {
  render() {
    return (
      <div id="favorite-recipes" class="col l9 m12 s12 offset-l3">
        <WelcomeDisplay />
        <div id="user-favorites" class="row">
          <div class="row">
            <RecipeCardSmall />
          </div>
        </div>
      </div>
    );
  }
}

export default UserFavoriteRecipe;