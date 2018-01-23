import React, { Component } from 'react';

import { Category, Recipes, TopRecipes } from './';

/**
 * @summary - Contents class declaration
 * @class Contents
 * @extends {Component}
 */
class Contents extends Component {
  /**
   * Renders the component
   * @method render
   *
   * @returns {JSX} JSX
   */
  render() {
    return (
      <div className="row">
        <Category />
        <Recipes />
        <TopRecipes />
      </div>
    );
  }
}

export default Contents;
