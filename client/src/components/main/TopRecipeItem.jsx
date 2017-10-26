import React from 'react';
import { Link } from 'react-router-dom';

const TopRecipeItem = props => 
  <Link to=''><li className="collection-item avatar">
    <img src={props.recipe.imageUrl} alt="" className="z-depth-1 square" />
    <span className="title red-text">{props.recipe.recipeName}</span>
  </li></Link>

export default TopRecipeItem;