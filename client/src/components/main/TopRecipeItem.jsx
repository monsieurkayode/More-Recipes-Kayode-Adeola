import React from 'react';
import { Link } from 'react-router-dom';

const TopRecipeItem = props => 
  <Link to=''><li className="collection-item avatar">
    <img src={`../uploads/${props.recipe.image}`} alt="" className="z-depth-1 square" />
    <span className="title red-text">{props.recipe.recipeName}</span>
  </li></Link>

export default TopRecipeItem;