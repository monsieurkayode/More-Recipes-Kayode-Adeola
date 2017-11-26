import React, { Component } from 'react';
import PropTypes from 'proptypes';

import { Ingredient } from './Index.jsx';

class Ingredients extends Component {
  render() {
    return (
      <div className="col l3 m4 s12 offset-l1">
        <span className=""><h5>Ingredients</h5></span>
        <p className="divider" />
        <ul>
          {this.props.ingredients.split(',')
            .map((ingredient, index) => // eslint-disable-next-line
              <Ingredient key={index} ingredient={ingredient} />)}
        </ul>
      </div>
    );
  }
}

Ingredients.propTypes = {
  ingredients: PropTypes.string.isRequired
};
export default Ingredients;
