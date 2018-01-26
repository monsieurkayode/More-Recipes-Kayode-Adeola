/* jshint esversion: 6 */

/**
 *
 * @description - Modifies an inputed string to pascalcase
 * @function pascalcase
 *
 * @param {string} input
 *
 * @returns {string} modified input
 */
const pascalCase = input => `${input[0].toUpperCase()}${input.slice(1).toLowerCase()}`;

export default pascalCase;
