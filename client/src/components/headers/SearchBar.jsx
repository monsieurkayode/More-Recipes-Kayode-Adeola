import React, { Component } from 'react';

class SearchBar extends Component {
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
