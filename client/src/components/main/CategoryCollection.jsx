import React, { Component } from 'react';
import { CategorizedRecipe } from './Index';

class CategoryCollection extends Component {
  render() {
    return (
      <li>
        <div className="collapsible-header">Pastry <i className="fa fa-angle-down right"></i></div>
        <div className="collapsible-body">
          <span>
            <ul>
              <CategorizedRecipe />
              <CategorizedRecipe />
              <CategorizedRecipe />
            </ul>
          </span>
        </div>
      </li>
    );
  }
}

export default CategoryCollection;