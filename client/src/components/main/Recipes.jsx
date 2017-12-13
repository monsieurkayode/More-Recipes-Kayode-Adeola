import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'proptypes';

import { RecipeItem } from './Index.jsx';

class Recipes extends Component {
  renderSampleRecipes = (key) => {
    const recipe = this.props.recipes[key];
    return (
      <RecipeItem key={key} recipe={recipe} />
    );
  }

  render() {
    return (
      <div className="col l5 m6 s12">
        <span>You are viewing page 1</span>
        <p className="divider" />
        <div className="row">
          {Object.keys(this.props.recipes).map(key =>
            this.renderSampleRecipes(key))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ recipes }) => ({ recipes });

Recipes.propTypes = {
  recipes: PropTypes.shape({}).isRequired
};

export default connect(mapStateToProps)(Recipes);
