import React, { Component } from 'react';
import recipeImg from '../../build/static/css/img/cake2.jpg';

class RecipeCardLarge extends Component {
  render() {
    return (
      <div className="col l6 m8 s12 offset-m2">
        <div className="card views">
          <RecipeCard />
        </div>
      </div>
    );
  }
}

export default RecipeCardLarge;