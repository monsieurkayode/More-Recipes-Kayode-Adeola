import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'proptypes';

import { TopRecipeItem } from './';

/**
 * @summary - TopRecipes class declaration
 * @class TopRecipes
 * @extends {Component}
 */
class TopRecipes extends Component {
  /**
   * @method renderTopRecipes
   *
   * @param {number} index
   *
   * @returns {JSX} JSX
   */
  renderTopRecipes = (index) => {
    const { isAuthenticated, recipes, topRecipes } = this.props;
    const recipe = isAuthenticated ? topRecipes[index] : recipes[index];
    return (
      <TopRecipeItem key={recipe.id} recipe={recipe} />
    );
  }

  /**
   * Renders the component
   * @method render
   *
   * @returns {JSX} JSX
   */
  render() {
    const { isAuthenticated, topRecipes, recipes } = this.props;
    const validRecipes = isAuthenticated ? topRecipes : recipes;
    return (
      <div className="col l3 m4 s12">
        <span><b>Top of the Week</b></span>
        <p className="divider" />
        <div id="trending">
          <ul className="collection">
            {Object.keys(validRecipes).map(index =>
              this.renderTopRecipes(index))}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  topRecipes,
  recipes,
  signinState,
}) => ({
  topRecipes,
  recipes: recipes.recipes,
  isAuthenticated: signinState.isAuthenticated
});

TopRecipes.defaultProps = {
  topRecipes: [],
  recipes: {}
};

TopRecipes.propTypes = {
  topRecipes: PropTypes.arrayOf(PropTypes.shape),
  recipes: PropTypes.shape({}),
  isAuthenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(TopRecipes);
