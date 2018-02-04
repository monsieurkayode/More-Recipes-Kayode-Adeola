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
    this.store = {};
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
    this.store[key] = value;
  }

  /**
   * Simulate localstorage getItem
   * @method getItem
   *
   * @param {string} key
   *
   * @return {string} any
   */
  getItem = key => this.store[key] || null;

  /**
   * Simulate localstorage removeItem
   * @method removeItem
   *
   * @param {string} key
   *
   * @return {void} void
   */
  removeItem = (key) => {
    delete this.store[key];
  }

  /**
   * Clears the mock localStorage
   * @method clear
   *
   * @return {void} void
   */
  clear = () => {
    this.store = {};
  }
}
