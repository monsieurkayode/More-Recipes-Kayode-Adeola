import React, { Component } from 'react';

class TopRecipeItem extends Component {
  render() {
    return (
      <div className="col l3 m4 s12">
        <span>Top of the Week</span>
        <p className="divider"></p>
        <div id="trending">
          <ul className="collection">
            <a href="recipe-view.html"><li className="collection-item avatar">
              <img src="css/img/cake2.jpg" alt="" className="z-depth-1 square" />
              <span class="title red-text">Frosty Chocolat</span>
            </li></a>
          </ul>
        </div>
      </div>
    );
  }
}

export default TopRecipeItem;