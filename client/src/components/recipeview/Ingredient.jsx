import React, { Component } from 'react';
import PropTypes from 'proptypes';

class Ingredient extends Component {
  render() {
    return (
      <li>{this.props.ingredient}</li>
    );
  }
}

Ingredient.propTypes = {
  ingredient: PropTypes.string.isRequired
};

export default Ingredient;
