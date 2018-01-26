import React from 'react';
import PropTypes from 'proptypes';

/**
 * CategorizedRecipe
 * @function CategorizedRecipe
 *
 * @param {string} category
 *
 * @returns {JSX} JSX
 */
const CategorizedRecipe = ({ category }) => (
  <li>{category}</li>
);

CategorizedRecipe.propTypes = {
  category: PropTypes.string.isRequired
};

export default CategorizedRecipe;
