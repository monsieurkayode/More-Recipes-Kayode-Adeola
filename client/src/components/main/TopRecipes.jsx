import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'proptypes';

import TopRecipeItem from './TopRecipeItem';

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
    const { topRecipes } = this.props;
    const recipe = topRecipes[index];
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
    const { topRecipes } = this.props;
    return (
      <div className="col l3 m4 s12">
        <span><b>Top of the Week</b></span>
        <p className="divider" />
        <div id="trending">
          <ul className="collection">
            {Object.keys(topRecipes).map(index =>
              this.renderTopRecipes(index))}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  topRecipes
}) => ({
  topRecipes
});

TopRecipes.defaultProps = {
  topRecipes: []
};

TopRecipes.propTypes = {
  topRecipes: PropTypes.arrayOf(PropTypes.shape)
};

export default connect(mapStateToProps)(TopRecipes);
