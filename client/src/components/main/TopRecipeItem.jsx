import React, { Component } from 'react';
import recipeImg from '../../build/static/css/img/cake2.jpg';

class TopRecipeItem extends Component {
  render() {
    return (
      <a href="recipe-view.html"><li className="collection-item avatar">
        <img src={recipeImg} alt="" className="z-depth-1 square" />
        <span className="title red-text">Frosty Chocolat</span>
      </li></a>
    );
  }
}

export default TopRecipeItem;