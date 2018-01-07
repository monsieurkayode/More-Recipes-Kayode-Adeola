import isEmpty from 'lodash/isEmpty';
import React, { Component } from 'react';
import PropTypes from 'proptypes';

import { WelcomeDisplay } from './Index.jsx';
import { RecipeCardSmall } from '../recipes/Index.jsx';

class UserFavoriteRecipe extends Component {
  hasFavorites = () => !isEmpty(this.props.userFavorites.recipes)

  renderUserFavorites = (index) => {
    const recipe = this.props.userFavorites.recipes[index];
    const { removeFavorite, selectRecipe } = this.props;
    return (
      <RecipeCardSmall
        key={recipe.id}
        index={recipe.id}
        recipe={recipe.Recipe}
        handleAction={removeFavorite}
        selectRecipe={selectRecipe}
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
            {this.hasFavorites() ?
              Object
                .keys(recipes)
                .sort((a, b) => b - a)
                .map(index => this.renderUserFavorites(index)) :
              <h5 style={{ textAlign: 'center' }}>
                You have not added any favorite recipe
              </h5>}
          </div>
        </div>
      </div>
    );
  }
}

UserFavoriteRecipe.defaultProps = {
  userFavorites: {},
  removeFavorite: null
};

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
    })
  }),
  removeFavorite: PropTypes.func,
  selectRecipe: PropTypes.func.isRequired
};

export default UserFavoriteRecipe;
