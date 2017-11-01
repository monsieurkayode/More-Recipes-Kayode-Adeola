import React from 'react';

const RecipeItem = ({ recipe }) =>
  <div className="col l6">
    <div className="card views-small">
      <div className="card-image">
        <a href="recipe-view.html"><img src={recipe.imageUrl} alt="" /></a>
        <span className="card-title">{recipe.views} Views</span>
      </div>
      <div className="card-content small-cards">
        <span className="card-title"><strong>{recipe.recipeName}</strong></span>
        <span className="right"><i className="material-icons tiny reaction">thumb_down</i>{recipe.downvote}</span>
        <span className="right"><i className="material-icons tiny reaction">thumb_up</i>{recipe.upvote}</span>
        <a className="chip teal white-text" href="/">{recipe.category}</a>
      </div>
    </div>
  </div>

export default RecipeItem;