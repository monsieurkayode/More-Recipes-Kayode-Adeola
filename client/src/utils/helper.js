/* jshint esversion: 6 */
import isEmpty from 'lodash/isEmpty';

import isEmail from '../../../shared/isEmail';
import isAlphaNumeneric from '../../../shared/isAlphaNum';

/**
 * @description - Function for handling client-side validation
 * @function validateInput
 *
 * @param {object} data
 *
 * @returns {object} error
 */
const validateInput = (data) => {
  const errors = {};

  if (!data.username || isEmpty(data.username)) {
    errors.username = 'Username is required';
  }
  if (data.username.length < 3) {
    errors.username = 'Username too short';
  }
  if (!isAlphaNumeneric(data.username)) {
    errors.username = 'Username is invalid';
  }
  if (!data.email || isEmpty(data.email)) {
    errors.email = 'Email is required';
  }
  if (!isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (!data.password) {
    errors.password = 'Password is required';
  }
  if (data.password.length < 6) {
    errors.password = 'Password too weak';
  }
  if (!data.confirmPassword) {
    errors.confirmPassword = 'Confirm password';
  }
  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords does not match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateInput;
