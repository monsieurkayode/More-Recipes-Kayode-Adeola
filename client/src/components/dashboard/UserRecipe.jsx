import React, { Component } from 'react';

class UserRecipe extends Component {
  render() {
    return (
      <div id="user-recipes" className="col l9 m12 s12 offset-l3">
        <WelcomeDisplay />
        <div id="my-recipes" className="row">
          <RecipeCardLarge />
        </div>
        <div className="row">
          <RecipeCardSmall />
        </div>
      </div>
    );
  }
}

export default UserRecipe;