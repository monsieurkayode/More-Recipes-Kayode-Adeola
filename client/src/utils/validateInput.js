/* jshint esversion: 6 */
import cleanString from '../../../server/helpers/cleanString';

const validateInput = (values) => {
  const errors = {};

  if (!values.comment || !cleanString(values.comment)) {
    errors.comment = 'Comment cannot be empty';
  }

  return errors;
};

export default validateInput;
