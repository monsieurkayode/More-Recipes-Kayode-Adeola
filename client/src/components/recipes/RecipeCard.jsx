import React, { Component } from 'react';
import PropTypes from 'proptypes';
import moment from 'moment';
import { Link } from 'react-router-dom';

class RecipeCard extends Component {
  render() {
    const { recipe, deletePost } = this.props;
    let time = recipe.createdAt;
    time = moment.utc(recipe.createdAt).format('MMMM DD h:mm a');
    return (
      <div>
        <div className="card-image">
          <Link to={`/recipes/${recipe.id}`}>
            <img
              className="responsive-img"
              src={`../uploads/${recipe.image}`}
              alt=""
            />
          </Link>
          <span className="card-title">{recipe.views} views</span>
        </div>
        <div className={`card-content ${this.props.size}`}>
          <span className="card-title">
            <strong>{recipe.recipeName}</strong>
          </span>
          <div className="divider" />
          <a className="edit chip">
            <i className="fa fa-pencil" /> Edit
          </a><span>
            <a
              onClick={() => deletePost(recipe.id)}
              className="delete chip"
            >
              <i className="fa fa-trash-o" /> Delete
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
  }
}

RecipeCard.defaultProps = {
  deletePost: null
};

RecipeCard.propTypes = {
  size: PropTypes.string.isRequired,
  recipe: PropTypes.shape({
  }).isRequired,
  deletePost: PropTypes.func
};

export default RecipeCard;
