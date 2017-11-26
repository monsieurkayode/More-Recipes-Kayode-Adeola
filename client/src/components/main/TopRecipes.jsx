import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'proptypes';

import TopRecipeItem from './TopRecipeItem.jsx';

class TopRecipes extends Component {
  renderTopRecipes = (key) => {
    const recipe = this.props.recipes[key];
    return (
      <TopRecipeItem key={recipe.id} recipe={recipe} />
    );
  }

  render() {
    return (
      <div className="col l3 m4 s12">
        <span>Top of the Week</span>
        <p className="divider" />
        <div id="trending">
          <ul className="collection">
            {Object.keys(this.props.recipes).map(key =>
              this.renderTopRecipes(key))}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ recipes }) => ({ recipes });

TopRecipes.propTypes = {
  recipes: PropTypes.shape({}).isRequired
};

export default connect(mapStateToProps)(TopRecipes);
