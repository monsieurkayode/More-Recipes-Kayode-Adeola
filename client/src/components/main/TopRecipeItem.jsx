import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'proptypes';

const TopRecipeItem = ({ recipe }) =>
  (<Link to={`/recipes/${recipe.id}`}>
    <li className="collection-item avatar">
      <img
        src={recipe.image ? `../uploads/${recipe.image}`
          : '../css/img/spice.jpg'}
        alt=""
        className="z-depth-1 square"
      />
      <span className="title red-text">{recipe.recipeName}</span>
    </li>
  </Link>);

TopRecipeItem.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number,
    image: PropTypes.string,
    recipeName: PropTypes.recipeName
  }).isRequired
};

export default TopRecipeItem;
