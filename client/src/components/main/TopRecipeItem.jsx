import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'proptypes';

/**
 * TopRecipeItem
 * @function TopRecipeItem
 *
 * @param {object} props
 *
 * @return {JSX} JSX
 */
const TopRecipeItem = ({ recipe }) =>
  (<Link to={`/recipes/${recipe.id}`}>
    <li className="collection-item avatar">
      <img
        src={`../uploads/${recipe.image}`}
        alt=""
        className="z-depth-1 square"
      />
      <span className="title red-text">{recipe.recipeName}</span>
    </li>
  </Link>);

TopRecipeItem.propTypes = {
  recipe: PropTypes.shape({}).isRequired
};

export default TopRecipeItem;
