/**
 * Validation function for creating recipe posts
 * @function validate
 *
 * @param {object} values
 *
 * @returns {objects} errors
 */
const validate = (values) => {
  const errors = {};

  if (!values.recipeName) {
    errors.recipeName = 'Please enter a recipe name';
  }

  if (!values.ingredients) {
    errors.ingredients = 'Please enter some ingredients';
  }

  if (!values.instructions) {
    errors.instructions = 'Please enter some instructions';
  }

  return errors;
};

export default validate;
