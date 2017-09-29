import React, { Component } from 'react';
import { CategoryCollection } from './Index';

class Category extends Component {
  render() {
    return (
      <div className="col l2 offset-l1 m2 hide-on-small-only">
        <span className="">Category</span>
        <p className="divider"></p>
        <div id="category">
          <ul className="collapsible z-depth-0" data-collapsible="accordion">
            <CategoryCollection />
            <CategoryCollection />
            <CategoryCollection />
          </ul>
        </div>
      </div>
    );
  }
}

export default Category;