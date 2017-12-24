import React, { Component } from 'react';
import PropTypes from 'proptypes';

import { RecipeCardSmall } from '../recipes/Index.jsx';
import { WelcomeDisplay } from './Index.jsx';

class UserRecipe extends Component {
  renderUserRecipes = (index) => {
    const recipe = this.props.userRecipes.recipes[index];
    return (
      <RecipeCardSmall
        key={recipe.id}
        index={recipe.id}
        recipe={recipe}
      />
    );
  }
  render() {
    const { recipes } = this.props.userRecipes;
    return (
      <div id="user-recipes" className="col l9 m12 s12 offset-l3">
        <WelcomeDisplay />
        <div id="my-recipes" className="row">
          {Object
            .keys(recipes)
            .sort((a, b) => b - a)
            .map(index => this.renderUserRecipes(index))}
        </div>
      </div>
    );
  }
}

UserRecipe.propTypes = {
  userRecipes: PropTypes.shape({
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

export default UserRecipe;
