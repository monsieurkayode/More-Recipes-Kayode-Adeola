import React, { Component } from 'react';
import TopRecipeItem from './TopRecipeItem';

class TopRecipes extends Component {
  render() {
    return (
      <div className="col l3 m4 s12">
        <span>Top of the Week</span>
        <p className="divider"></p>
        <div id="trending">
          <ul className="collection">
            <TopRecipeItem />
            <TopRecipeItem />
            <TopRecipeItem />
            <TopRecipeItem />
            <TopRecipeItem />
          </ul>
        </div>
      </div>
    );
  }
}

export default TopRecipes;