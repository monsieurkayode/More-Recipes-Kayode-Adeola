import React, { Component } from 'react';
import PropTypes from 'proptypes';

import { WelcomeDisplay } from './Index.jsx';
import { RecipeCardSmall } from '../recipes/Index.jsx';

class UserFavoriteRecipe extends Component {
  renderUserFavorites = (index) => {
    const recipe = this.props.userFavorites.recipes[index];
    return (
      <RecipeCardSmall
        key={recipe.id}
        index={recipe.id}
        recipe={recipe.Recipe}
      />
    );
  }
  render() {
    const { recipes } = this.props.userFavorites;
    return (
      <div id="favorite-recipes" className="col l9 m12 s12 offset-l3">
        <WelcomeDisplay />
        <div id="user-favorites" className="row">
          <div className="row">
            {Object
              .keys(recipes)
              .sort((a, b) => b - a)
              .map(index => this.renderUserFavorites(index))}
          </div>
        </div>
      </div>
    );
  }
}

UserFavoriteRecipe.propTypes = {
  userFavorites: PropTypes.shape({
    recipes: PropTypes.shape({
      id: PropTypes.number,
      views: PropTypes.number,
      upvote: PropTypes.number,
      downvote: PropTypes.number,
      recipeName: PropTypes.string,
      category: PropTypes.string,
      ingredients: PropTypes.string,
      instructions: PropTypes.string,
      image: PropTypes.string
    }).isRequired
  }).isRequired
};

export default UserFavoriteRecipe;
