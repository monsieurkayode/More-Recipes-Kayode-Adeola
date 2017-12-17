import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'proptypes';
import pascalCase from '../../utils/pascalCase';

const RecipeItem = ({ recipe, upvote, downvote }) =>
  (<div className="col l6">
    <div className="card views-small">
      <div className="card-image">
        <Link to={`/recipes/${recipe.id}`}>
          <img
            src={recipe.image ? `../uploads/${recipe.image}`
              : './css/img/spice.jpg'}
            alt={recipe.recipeName}
          />
        </Link>
        <span className="card-title">{recipe.views} Views</span>
      </div>
      <div className="card-content small-cards">
        <span className="card-title">
          <strong>{recipe.recipeName}</strong>
        </span>
        <span
          onClick={() => downvote(recipe.id)}
          className="unlike right"
        >
          <i
            className="material-icons tiny reaction"
          >thumb_down</i>{recipe.downvote}
        </span>
        <span
          onClick={() => upvote(recipe.id)}
          className="like right"
        >
          <i
            className="material-icons tiny reaction"
          >thumb_up</i>{recipe.upvote}
        </span>
        <Link
          to={`/recipes/${recipe.id}`}
          className="chip teal white-text"
        >{pascalCase(recipe.category)}
        </Link>
      </div>
    </div>
  </div>);

RecipeItem.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.any,
    views: PropTypes.number,
    upvote: PropTypes.number,
    downvote: PropTypes.number,
    recipeName: PropTypes.string,
    category: PropTypes.string,
    ingredients: PropTypes.string,
    instructions: PropTypes.string,
    image: PropTypes.string
  }).isRequired,
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired,
};

export default RecipeItem;
