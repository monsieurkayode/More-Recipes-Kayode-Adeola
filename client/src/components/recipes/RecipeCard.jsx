import React from 'react';
import PropTypes from 'proptypes';
import { Link } from 'react-router-dom';
import { formatTime } from '../../utils/timeFormat';
/**
 * RecipeCard
 * @function RecipeCard
 *
 * @param {object} props
 *
 * @return {JSX} JSX
 */
const RecipeCard = (props) => {
  const { recipe, selected, selectRecipe } = props;
  let time = recipe.createdAt;
  time = formatTime(time, 'MMMM DD h:mm a');
  return (
    <div>
      <div className="card-image">
        <Link to={`/recipes/${recipe.id}`}>
          <img
            className="responsive-img"
            src={recipe.image}
            alt=""
          />
        </Link>
        <span className="card-title">{recipe.views} views</span>
      </div>
      <div className={`card-content ${props.size}`}>
        <span className="card-title truncate">
          <strong>{recipe.recipeName}</strong>
        </span>
        <div className="divider" />
        <Link
          to={selected === 'recipes' ? `/recipes/${recipe.id}/edit` :
            `/favorites/${recipe.id}/edit`}
          className="edit chip"
        >
          <i className="fa fa-pencil" /> Edit
        </Link><span>
          <a
            onClick={() => selectRecipe(recipe.id)}
            className="delete chip modal-trigger"
            href="#modal-delete"
          >
            <i className="fa fa-trash-o" />
            {selected === 'recipes' ? ' Delete' : ' Remove'}
          </a><br />
          <span className="right">
            <i className="material-icons tiny reaction">
              thumb_down</i>{recipe.downvote}
          </span>
          <span className="right">
            <i className="material-icons tiny reaction">
              thumb_up</i>{recipe.upvote}
          </span>
          <span><p className="created-at">{time}</p></span>
        </span>
      </div>
    </div>
  );
};

RecipeCard.defaultProps = {
  selected: ''
};

RecipeCard.propTypes = {
  size: PropTypes.string.isRequired,
  recipe: PropTypes.shape({
  }).isRequired,
  selected: PropTypes.string,
  selectRecipe: PropTypes.func.isRequired
};

export default RecipeCard;
