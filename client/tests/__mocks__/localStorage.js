/* eslint-disable import/prefer-default-export */

/**
 * @summary - LocalStorage class declaration
 * @class LocalStorage
 */
export class LocalStorage {
  /**
   * LocalStorage constructor
   * @param {object} props
   * @memberOf LocalStorage
   */
  constructor() {
    this.data = {};
  }

  /**
   * Simulate localstorage setItem
   * @method setItem
   *
   * @param {string} key
   * @param {string} value
   *
   * @return {void} void
   */
  setItem = (key, value) => {
    this.data[key] = value;
  }

  /**
   * Simulate localstorage getItem
   * @method getItem
   *
   * @param {string} key
   *
   * @return {string} any
   */
  getItem = key => this.data[key] || null;

  /**
   * Simulate localstorage removeItem
   * @method removeItem
   *
   * @param {string} key
   *
   * @return {void} void
   */
  removeItem = (key) => {
    delete this.data[key];
  }

  /**
   * Clears the mock localStorage
   * @method clear
   *
   * @return {void} void
   */
  clear = () => {
    this.data = {};
  }
}
