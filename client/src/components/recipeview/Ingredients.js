import React, { Component } from 'react';
import { Ingredient } from './Index';

class Ingredients extends Component {
  render() {
    return (
      <div className="col l3 m4 s12 offset-l1">
        <span className=""><h5>Ingredients</h5></span>
        <p className="divider"></p>
        <ul>
          {this.props.ingredients.split(',').map((ingredient, index) => <Ingredient key={index} ingredient = {ingredient} />)}
        </ul>
      </div>
    );
  }
}

export default Ingredients;