import isEmpty from 'lodash/isEmpty';

const isEmail = (str) => {
  // eslint-disable-next-line
  const exp = /([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})/;
  if (str.match(exp) || !str.length) {
    return true;
  }
  return false;
};

const isAlphaNumeneric = (str) => {
  const exp = /^[A-Za-z0-9]+$/;
  if (str.match(exp)) {
    return true;
  }
  return false;
};

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
