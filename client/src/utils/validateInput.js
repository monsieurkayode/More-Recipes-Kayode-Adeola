/* jshint esversion: 6 */
import cleanString from '../../../shared/cleanString';

/**
 * Validation function for reviews
 * @function validateInput
 *
 * @param {object} values
 *
 * @returns {objects} errors
 */
const validateInput = (values) => {
  const errors = {};

  if (!values.comment || !cleanString(values.comment)) {
    errors.comment = 'Comment cannot be empty';
  }

  return errors;
};

export default validateInput;
