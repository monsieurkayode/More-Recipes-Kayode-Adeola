import React from 'react';
import PropTypes from 'proptypes';

import { CategorizedRecipe } from './';

const CategoryCollection = ({ category }) =>
  (<li>
    <div className="collapsible-header">{category}
      <i className="fa fa-angle-down right" /></div>
    <div className="collapsible-body">
      <span>
        <ul>
          <CategorizedRecipe category={category} />
        </ul>
      </span>
    </div>
  </li>);
CategoryCollection.propTypes = {
  category: PropTypes.string.isRequired
};

export default CategoryCollection;
