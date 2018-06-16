/**
 * @description Helper function that checks if string
 * contains only white spaces
 *
 *@function isEmpty
 *
 * @param {string} str
 *
 * @returns {boolean} boolean
 */
const isEmpty = (str) => {
  const exp = /^[ ]+$/;
  if (str.match(exp) || !str.length) {
    return true;
  }
  return false;
};

export default isEmpty;
