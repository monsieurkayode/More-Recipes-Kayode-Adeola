import React from 'react';
import PropTypes from 'proptypes';

const CategorizedRecipe = ({ category }) => (
  <li>{category}</li>
);

CategorizedRecipe.propTypes = {
  category: PropTypes.string.isRequired
};

export default CategorizedRecipe;
