/* jshint esversion: 6 */
import isEmpty from 'lodash/isEmpty';

import isEmail from '../../../shared/isEmail';
import isAlphaNumeneric from '../../../shared/isAlphaNum';
import cleanString from '../../../shared/cleanString';

/**
 * @description - Function for handling client-side validation
 * @function validateSignup
 *
 * @param {object} values
 *
 * @returns {object} error
 */
const validateSignup = (values) => {
  const errors = {};

  if (!values.username || isEmpty(values.username)) {
    errors.username = 'Username is required';
  }
  if (!isEmpty(values.username)
    && cleanString(values.username).length < 3) {
    errors.username = 'Username too short';
  }
  if (!isEmpty(values.username)
    && cleanString(values.username).length > 30) {
    errors.username = 'Username too long';
  }
  if (!isEmpty(values.username)
    && !isAlphaNumeneric(cleanString(values.username))) {
    errors.username = 'Username should contain alphabets and numbers only';
  }
  if (!values.email || isEmpty(values.email)) {
    errors.email = 'Email is required';
  }
  if (!isEmail(values.email)) {
    errors.email = 'Email is invalid';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  }
  if (!isEmpty(values.password) && values.password.length < 6) {
    errors.password = 'Password too weak';
  }
  if (values.password.length >= 6 && !values.confirmPassword) {
    errors.confirmPassword = 'Confirm password';
  }
  if (values.password.length >= 6
    && !isEmpty(values.confirmPassword)
    && values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateSignup;
