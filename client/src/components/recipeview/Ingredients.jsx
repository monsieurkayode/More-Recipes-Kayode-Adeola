import React, { Component } from 'react';
import { Ingredient } from './Index';

class Ingredients extends Component {
  render() {
    const ingredients = 'Baking Powder, Flour, Sugar'.split(',');
    return (
      <div className="col l3 m4 s12 offset-l1">
        <span className=""><h5>Ingredients</h5></span>
        <p className="divider"></p>
        <ul>
          <Ingredient>
            {ingredients.map((ingredient, index )=> <li key={index}>{ingredient}</li>)}
          </Ingredient>
        </ul>
      </div>
    );
  }
}

export default Ingredients;