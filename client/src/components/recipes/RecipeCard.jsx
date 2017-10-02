import React, { Component } from 'react';
import recipeImg from '../../build/static/css/img/cake2.jpg';

class RecipeCard extends Component {
  render() {
    return (
      <div>
        <div className="card-image">
          <a href="recipe-view.html"><img src={recipeImg} alt="" /></a>
          <span className="card-title">24 Views</span>
        </div>
        <div className="card-content small-cards">
          <span className="card-title"><strong>Frosty Chocolat</strong></span>
          <div className="divider"></div>
          <a className="edit chip modal-trigger" href="#modal-edit"><i className="fa fa-pencil"></i> Edit</a><span>
          <a className="delete chip modal-trigger" href="#modal-delete"><i className="fa fa-trash-o"></i> Delete</a><br />
          <span className="right"><i className="material-icons tiny reaction">thumb_down</i>2</span>
          <span className="right"><i className="material-icons tiny reaction">thumb_up</i>10</span>
          <span className="right">12</span><i className="material-icons comment right">comment</i>
          <span><p className="created-at">2 Aug 17, 10:55am</p></span>
          </span>
        </div>
      </div>
    );
  }
}

export default RecipeCard;