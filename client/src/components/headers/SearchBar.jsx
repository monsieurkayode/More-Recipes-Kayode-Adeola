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
        <i>
          <input
            className="teal-text white input-fa"
            type="search"
            placeholder="&#xf002; Search"
          />
        </i>
      </form>
    );
  }
}

export default SearchBar;
