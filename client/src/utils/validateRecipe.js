/**
 * Validation function for creating recipe posts
 * @function validateRecipe
 *
 * @param {object} values
 *
 * @returns {objects} errors
 */
const validateRecipe = (values) => {
  const errors = {};

  if (!values.recipeName) {
    errors.recipeName = 'Please enter a recipe name';
  }

  if (values.recipeName && values.recipeName.length > 30) {
    errors.recipeName = 'Recipe name too long';
  }

  if (!values.ingredients) {
    errors.ingredients = 'Please enter some ingredients';
  }

  if (!values.instructions) {
    errors.instructions = 'Please enter some instructions';
  }

  return errors;
};

export default validateRecipe;
