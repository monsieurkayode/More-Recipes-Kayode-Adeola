import React from 'react';
import { CategorizedRecipe } from './Index';

const CategoryCollection = ({ recipe }) =>
  <li>
    <div className="collapsible-header">{recipe.category}<i className="fa fa-angle-down right"></i></div>
    <div className="collapsible-body">
      <span>
        <ul>
          <CategorizedRecipe recipe={recipe} />
        </ul>
      </span>
    </div>
  </li>

export default CategoryCollection;