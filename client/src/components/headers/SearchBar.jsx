import React, { Component } from 'react';

/**
 * @summary -SearchBar class declaration
 * @class SearchBar
 * @extends {Component}
 */
class SearchBar extends Component {
  /**
   * Renders the component
   * @method render
   *
   * @returns {JSX} JSX
   */
  render() {
    return (
      <form id="nav-search">
        <input
          className="white input-fa"
          type="search"
          placeholder="&#xf002; Search"
        />
      </form>
    );
  }
}

export default SearchBar;
