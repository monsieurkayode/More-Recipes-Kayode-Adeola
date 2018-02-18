/**
 * @description Helper function that checks if argument
 * contains only numbers
 *
 *@function isNumber
 *
 * @param {number} str
 *
 * @returns {boolean} boolean
 */
const isNumber = (str) => {
  const exp = /^[0-9]+$/;
  if (str.match(exp)) {
    return true;
  }
  return false;
};

export default isNumber;
