import isEmpty from 'lodash/isEmpty';

import cleanString from '../../../shared/cleanString';

/**
 * @description - Function for handling client-side validation
 * of user profile update
 * @function validateProfileUpdate
 *
 * @param {object} values
 *
 * @returns {object} error
 */
const validateProfileUpdate = (values) => {
  const errors = {};
  const exp = /^[A-Za-z- ]+$/;

  if (!values.firstName || isEmpty(values.firstName)) {
    errors.firstName = 'First name field is required';
  }
  if (!isEmpty(values.firstName) && cleanString(values.firstName).length < 3) {
    errors.firstName = 'First name should be minimum of 3 characters';
  }
  if (!isEmpty(values.firstName) && cleanString(values.firstName).length > 30) {
    errors.firstName = 'First name should be maximum of 30 characters';
  }
  if (!isEmpty(values.firstName) && !values.firstName.match(exp)) {
    errors.firstName = 'First name should contain alphabets and hyphen only';
  }
  if (!values.lastName || isEmpty(values.lastName)) {
    errors.lastName = 'Last name field is required';
  }
  if (!isEmpty(values.lastName) && cleanString(values.lastName).length < 3) {
    errors.lastName = 'Last name should be minimum of 3 characters';
  }
  if (!isEmpty(values.lastName) && cleanString(values.lastName).length > 30) {
    errors.lastName = 'Last name should be maximum of 30 characters';
  }
  if (!isEmpty(values.lastName) && !values.lastName.match(exp)) {
    errors.lastName = 'Last name should contain alphabets and hyphen only';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateProfileUpdate;
