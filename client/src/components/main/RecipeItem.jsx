import React, { Component } from 'react';
import recipeImg from '../../css/img/cake2.jpg';

class RecipeItem extends Component {
  render() {
    return (
      <div className="col l6">
        <div className="card views-small">
          <div className="card-image">
            <a href="recipe-view.html"><img src={recipeImg} alt="" /></a>
            <span className="card-title">24 Views</span>
          </div>
          <div className="card-content small-cards">
            <span className="card-title"><strong>Frosty Chocolat</strong></span>
            <span className="right"><i className="material-icons tiny reaction">thumb_down</i>2</span>
            <span className="right"><i className="material-icons tiny reaction">thumb_up</i>10</span>
            <a className="chip teal white-text" href="/">Pastry</a>
          </div>
        </div>
      </div>
    );
  }
}

export default RecipeItem;